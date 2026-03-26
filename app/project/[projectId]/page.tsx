import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProjectWorkspace } from "@/components/project-workspace";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;
  
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const project = await prisma.project.findUnique({
    where: { 
      id: resolvedParams.projectId,
      userId: session.user.id // Security check to ensure the user owns it
    },
    include: {
      videos: true,
    }
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--vm-bg)] overflow-x-hidden pt-24 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-[var(--vm-text-primary)] font-syne mt-12">Project Not Found</h1>
        <p className="text-[var(--vm-text-secondary)] mt-4">This project does not exist or you don't have access.</p>
      </div>
    );
  }

  return <ProjectWorkspace project={project} />;
}
