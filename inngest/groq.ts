import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "", // Register your free key at: https://console.groq.com/keys
});

// Llama 3.3 70B Versatile is currently the most powerful ultra-fast free model Groq supports.
export const GROQ_MODEL = "llama-3.3-70b-versatile";
