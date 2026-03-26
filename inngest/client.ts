import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "vid-motion-ai",
  // In development, force routing to the local dev server so we don't need a hard server restart to pick up .env changes
  eventKey: process.env.NODE_ENV === "development" ? "local" : process.env.INNGEST_EVENT_KEY,
});
