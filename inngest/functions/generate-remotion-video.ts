import { inngest } from "../client";
import prisma from "@/lib/prisma";
import { groq, GROQ_MODEL } from "../groq";
import fs from "fs";
import path from "path";

export const generateRemotionVideo = inngest.createFunction(
  { 
    id: "generate-remotion-video",
    triggers: [{ event: "video/generate" }]
  },
  async ({ event, step }) => {
    const { projectId } = event.data;

    // 1. Fetch Project Information
    const project = await step.run("fetch-project", async () => {
      const p = await prisma.project.findUnique({ where: { id: projectId } });
      if (!p) throw new Error("Project not found");
      return p;
    });

    // Update Status: Analyzing
    await step.run("update-status-analyzing", async () => {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "analyzing" },
      });
    });

    // 2. Generate detailed Motion Graphic Prompt via Groq 
    const enhancedPrompt = await step.run("generate-motion-prompt", async () => {
      const response = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an expert AI motion graphics director for short-form Remotion videos."
          },
          {
            role: "user",
            content: `Create a production-grade motion graphics direction prompt based on this user input:\n\nUser prompt: ${project.prompt}\nDuration: ${project.duration}\nAspect ratio: ${project.aspectRatio}\n\nThe output must include:\n1. Visual style direction\n2. Scene-by-scene narrative (with timing)\n3. Animation behavior and transitions\n4. On-screen text guidance\n5. Audio mood guidance\n\nReturn a concise but detailed production prompt in plain text.`
          }
        ],
        temperature: 0.7,
      });
      return response.choices[0]?.message?.content || "";
    });

    // Update Status: Composing
    await step.run("update-status-composing", async () => {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "composing" }, 
      });
    });

    await step.sleep("ui-transition-1", "3s");

    // 3. Generate Theme Config (JSON) via Groq
    const themeConfig = await step.run("generate-theme-config", async () => {
      const response = await groq.chat.completions.create({
        model: GROQ_MODEL,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Based on this video narrative: "${enhancedPrompt}", generate a strict JSON configuration for a Remotion theme.`
          },
          {
            role: "user",
            content: `It must include exactly the keys: "primaryColor", "secondaryColor", "backgroundColor", "fontFamily" (a robust Google font), and "animationVelocity" (number 1-5). Return ONLY valid JSON.`
          }
        ],
      });
      
      const jsonContent = response.choices[0]?.message?.content || "{}";
      return JSON.parse(jsonContent);
    });

    // Update Status: Rendering (Code Generation)
    await step.run("update-status-rendering", async () => {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "rendering" }, 
      });
    });

    await step.sleep("ui-transition-2", "3s");

    // 4. Generate Remotion Composition Code via Groq Llama 3 70B
    const compositionCode = await step.run("generate-remotion-code", async () => {
      
      let skillRules = "";
      try {
         skillRules = fs.readFileSync(path.join(process.cwd(), '.agents', 'skills', 'remotion-best-practices', 'SKILL.md'), 'utf-8');
      } catch (e) {
         console.warn("Could not load Remotion skill file");
      }

      const response = await groq.chat.completions.create({
         model: GROQ_MODEL,
         messages: [
           {
             role: "system",
             content: `You are an expert Remotion developer. Build a sophisticated, visually stunning Motion Graphic Composition natively in React targeting ${project.aspectRatio} dimension for ${project.duration}.\n\nStrictly adhere to the following Remotion developer best practices:\n${skillRules}`
           },
           {
             role: "user",
             content: `Theme constraints:\n${JSON.stringify(themeConfig)}\n\nNarrative:\n${enhancedPrompt}\n\nWrite ONLY valid, robust TypeScript code for a full natively self-contained Remotion <Composition /> component utilizing AbsoluteFill, interpolate, spring, useCurrentFrame, and useVideoConfig organically.\nExport the Component as default. Include all necessary Remotion imports. DO NOT wrap with markdown ticks.`
           }
         ],
         temperature: 0.2, // low temp for safer code output
      });
      
      let code = response.choices[0]?.message?.content || "";
      // Clean up markdown ticks if present
      code = code.replace(/^```tsx?/, "").replace(/```$/, "").trim();
      return code;
    });

    // 5. Save generated elements and finalize status
    await step.run("save-and-finalize", async () => {
      await prisma.generatedVideo.create({
        data: {
          projectId: projectId,
          compositionCode: compositionCode,
          themeConfig: JSON.stringify(themeConfig),
          status: "completed",
        }
      });

      await prisma.project.update({
        where: { id: projectId },
        data: { status: "completed" },
      });
    });

    return { success: true, projectId };
  }
);
