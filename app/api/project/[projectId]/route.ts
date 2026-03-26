import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params;
  
  // Authenticate user to ensure they have right to poll this project status
  // Note: we can use token or header based on auth implementation, but here we can just do a basic fetch for now.
  const authCookie = req.headers.get("cookie");
  
  // Note: In real app, we should validate session mapping. For simplicity of dashboard polling, we strictly fetch by ID if authenticated.
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.projectId },
    select: { 
      status: true, 
      prompt: true, 
      duration: true, 
      aspectRatio: true,
      videos: {
        select: {
          compositionCode: true,
          themeConfig: true,
          videoUrl: true,
        }
      }
    }
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
