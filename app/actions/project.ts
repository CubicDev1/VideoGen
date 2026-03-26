"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { inngest } from "@/inngest/client";
import { request } from "@arcjet/next";
import { aj } from "@/lib/arcjet";

export async function createProjectAction(data: { prompt: string; duration: string; aspectRatio: string; projectId?: string }) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    throw new Error("unauthorized");
  }

  // 1. Arcjet Rate-Limit & Spam Prevention (Protects endpoints from racing or malicious AI usage)
  const req = await request();
  const decision = await aj.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    throw new Error("Arcjet Rate Limit Exceeded: Please wait at least 10 seconds before generating again to preserve bandwidth.");
  }

  // 2. Locate Active User Credits Instance
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!currentUser) throw new Error("Internal Server Error: User not found");

  // Determine pricing model required
  const isModifying = !!data.projectId;
  const creditCost = isModifying ? 15 : 30;

  // 3. User Credit Quota Constraint Checks
  if (currentUser.credits <= 0 || currentUser.credits < creditCost) {
    throw new Error("Insufficient VidMotion credits left. Try refilling or upgrading your membership tiers.");
  }

  // 4. Safely deduct standard credit rate transaction
  await prisma.user.update({
    where: { id: session.user.id },
    data: { credits: { decrement: creditCost } },
  });

  let activeProjectId = data.projectId;

  // 5. Route to modify vs execute payload logic natively
  if (isModifying && activeProjectId) {
    await prisma.project.update({
      where: { 
        id: activeProjectId,
        userId: session.user.id // ensure secure data mapping
      },
      data: {
        prompt: data.prompt.slice(0, 2000),
        status: "pending",
        duration: data.duration,
        aspectRatio: data.aspectRatio,
      }
    });
  } else {
    // Creating Brand New Canvas
    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        prompt: data.prompt.slice(0, 2000), 
        duration: data.duration,
        aspectRatio: data.aspectRatio,
        status: "pending",
      },
    });
    activeProjectId = project.id;
  }

  // 6. Trigger background job via Inngest asynchronously
  await inngest.send({
    name: "video/generate",
    data: {
      projectId: activeProjectId,
    },
  });

  return activeProjectId;
}
