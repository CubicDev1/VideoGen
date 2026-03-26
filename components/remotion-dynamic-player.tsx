"use client";

import React, { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { transform } from "sucrase";
import * as Remotion from "remotion";

export function RemotionDynamicPlayer({ compositionCode, themeConfig, durationFrames, aspectRatio }: any) {
  const [GeneratedComponent, setGeneratedComponent] = useState<React.FC<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!compositionCode) return;

    try {
      // 1. Transpile the strict TSX string down to ES5 CommonJS natively inside the browser!
      const compiled = transform(compositionCode, {
        transforms: ["jsx", "typescript", "imports"],
        production: true,
      });

      // 2. Build a local virtual module Sandbox routing imports dynamically
      const virtualModule = { exports: { default: null } };
      
      const requirePolyfill = (moduleName: string) => {
        if (moduleName === "react") return React;
        if (moduleName === "remotion") return Remotion;
        console.warn(`AI attempted to import unsupported module: ${moduleName}`);
        return {};
      };

      // 3. Evaluate securely using scoped dependencies
      const exec = new Function(
        "require",
        "module",
        "exports",
        "React",
        "Remotion",
        compiled.code
      );

      exec(requirePolyfill, virtualModule, virtualModule.exports, React, Remotion);

      if (virtualModule.exports.default) {
        setGeneratedComponent(() => virtualModule.exports.default);
      } else {
        throw new Error("AI Code failed to export a default component mapping.");
      }
    } catch (e: any) {
      console.error("Transpilation Evaluation Error:", e);
      setError(e.message);
    }
  }, [compositionCode]);

  // Decode aspect ratios intuitively (e.g. "16:9" -> [1920, 1080])
  const [w, h] = aspectRatio === "16:9" ? [1920, 1080] : aspectRatio === "9:16" ? [1080, 1920] : [1080, 1080];

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8 bg-red-50 text-red-600 rounded-2xl flex-col">
        <p className="font-semibold mb-2">Remotion Parsing Failed</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }

  if (!GeneratedComponent) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl">
        <div className="animate-pulse flex items-center gap-2 text-slate-500">
          <div className="h-4 w-4 bg-purple-500 rounded-full animate-bounce" />
          Mounting Composition Canvas...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-black/5 rounded-2xl overflow-hidden p-4 relative shadow-inner">
      <Player
        component={GeneratedComponent}
        durationInFrames={durationFrames || 300} // fallback to 10s at 30fps
        compositionWidth={w}
        compositionHeight={h}
        fps={30}
        controls
        autoPlay
        loop
        inputProps={{
          ...themeConfig, // Maps the AI generated strict JSON payload as inputs
        }}
        style={{
          width: "100%",
          maxHeight: "100%",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.2)"
        }}
      />
    </div>
  );
}
