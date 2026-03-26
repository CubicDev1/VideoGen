import prisma from "./lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "creator@example.com",
      name: "Creator User",
      passwordHash: "dummy-hash",
      credits: 100,
    },
  });

  const project = await prisma.project.create({
    data: {
      userId: user.id,
      prompt: "A beautiful cinematic sunrise over a cyber city",
      duration: "15s",
      aspectRatio: "16:9",
      status: "completed",
    },
  });

  const generatedVideo = await prisma.generatedVideo.create({
    data: {
      projectId: project.id,
      compositionCode: "export const Comp = () => <Video/>;",
      themeConfig: JSON.stringify({ bg: "black", text: "white" }),
      videoUrl: "https://example.com/video.mp4",
      status: "generated",
    },
  });

  console.log("Created user:", user);
  console.log("Created project for user:", project);
  console.log("Created generated video for project:", generatedVideo);

  const fetchedUser = await prisma.user.findUnique({
    where: { email: "creator@example.com" },
    include: {
      projects: {
        include: {
          videos: true,
        },
      },
    },
  });

  console.log("Fetched User with all nested data:", JSON.stringify(fetchedUser, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
