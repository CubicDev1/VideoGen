import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  // Provide your Arcjet Key here. It's safe to fallback so your dev server doesn't crash prior to getting a key
  key: process.env.ARCJET_KEY || "ajkey_test_12345", 
  rules: [
    // Strict token bucket limitation preventing rapid double-spending by clicking "Generate" multiple times
    tokenBucket({
      mode: "LIVE",
      refillRate: 1, // Allow 1 request
      interval: 10,   // every 10 seconds per unique IP/user
      capacity: 1,   // Burst capacity absolutely restricted to 1
    }),
  ],
});
