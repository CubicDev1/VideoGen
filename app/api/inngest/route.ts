import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { generateRemotionVideo } from "../../../inngest/functions/index";

// Create an API that serves zero-downtime background jobs
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateRemotionVideo],
});
