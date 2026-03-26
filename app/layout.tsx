import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "VidMotionAI — AI Graphic Video Generator",
  description:
    "Generate stunning AI-powered graphic videos in seconds. Choose your prompt, duration, and aspect ratio — VidMotionAI does the rest.",
  keywords: ["AI video generator", "graphic video", "motion AI", "VidMotionAI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
