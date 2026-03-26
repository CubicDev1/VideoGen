"use client";

import React, { useState } from "react";
import {
  Send,
  Clock,
  Monitor,
  Smartphone,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// ── Types ──
type Duration = "5s" | "10s" | "15s" | "20s";
type Ratio = "16:9" | "9:16";

const DURATIONS: { value: Duration; label: string }[] = [
  { value: "5s", label: "5 sec" },
  { value: "10s", label: "10 sec" },
  { value: "15s", label: "15 sec" },
  { value: "20s", label: "20 sec" },
];

export function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState<Duration>("10s");
  const [ratio, setRatio] = useState<Ratio>("16:9");
  const [durationOpen, setDurationOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2500);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 780,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Glow behind box */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: "calc(var(--vm-radius-2xl) + 4px)",
          background: "var(--vm-cta-gradient)",
          opacity: 0.15,
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main box */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--vm-surface)",
          border: "1px solid var(--vm-border-active)",
          borderRadius: "var(--vm-radius-2xl)",
          overflow: "visible",
          boxShadow: "var(--vm-shadow-lg)",
        }}
      >
        {/* Textarea */}
        <div style={{ padding: "20px 20px 4px" }}>
          <textarea
            id="prompt-textarea"
            aria-label="Enter your video generation prompt"
            placeholder="Describe your vision… a cinematic sunset over a neon city, particles swirling into a logo, abstract fluid motion…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleGenerate();
              }
            }}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--vm-text-primary)",
              caretColor: "var(--vm-accent)",
            }}
          />
        </div>

        {/* Controls bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px 16px",
            flexWrap: "wrap",
          }}
        >
          {/* ── Duration Dropdown ── */}
          <div style={{ position: "relative" }}>
            <button
              id="duration-select-btn"
              aria-haspopup="listbox"
              aria-expanded={durationOpen}
              aria-label="Select video duration"
              onClick={() => setDurationOpen((v) => !v)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "0 12px",
                height: 34,
                borderRadius: "var(--vm-radius-md)",
                background: "var(--vm-elevated)",
                border: "1px solid var(--vm-border)",
                color: "var(--vm-text-secondary)",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                fontSize: 13,
                cursor: "pointer",
                transition: "border-color 0.2s ease, color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--vm-border-active)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--vm-text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--vm-border)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--vm-text-secondary)";
              }}
            >
              <Clock size={14} strokeWidth={2} />
              {duration}
              <ChevronDown
                size={12}
                strokeWidth={2}
                style={{
                  transition: "transform 0.2s ease",
                  transform: durationOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Duration dropdown menu */}
            {durationOpen && (
              <>
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 10,
                  }}
                  onClick={() => setDurationOpen(false)}
                />
                <div
                  role="listbox"
                  aria-label="Duration options"
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 6px)",
                    left: 0,
                    zIndex: 20,
                    background: "var(--vm-elevated)",
                    border: "1px solid var(--vm-border-active)",
                    borderRadius: "var(--vm-radius-md)",
                    boxShadow: "var(--vm-shadow-md)",
                    overflow: "hidden",
                    minWidth: 120,
                    animation: "vm-fade-up 0.15s ease both",
                  }}
                >
                  {DURATIONS.map((d) => (
                    <button
                      key={d.value}
                      role="option"
                      aria-selected={duration === d.value}
                      id={`duration-option-${d.value}`}
                      onClick={() => {
                        setDuration(d.value);
                        setDurationOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "9px 12px",
                        background:
                          duration === d.value
                            ? "rgba(79,119,255,0.12)"
                            : "transparent",
                        border: "none",
                        color:
                          duration === d.value
                            ? "var(--vm-accent)"
                            : "var(--vm-text-secondary)",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: duration === d.value ? 600 : 400,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "background 0.15s ease, color 0.15s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (duration !== d.value) {
                          (e.currentTarget as HTMLElement).style.background =
                            "var(--vm-elevated)";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--vm-text-primary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (duration !== d.value) {
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--vm-text-secondary)";
                        }
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Ratio Tabs ── */}
          <div
            role="tablist"
            aria-label="Screen ratio"
            style={{
              display: "inline-flex",
              background: "var(--vm-elevated)",
              border: "1px solid var(--vm-border)",
              borderRadius: "var(--vm-radius-md)",
              padding: 3,
              gap: 2,
            }}
          >
            {(["16:9", "9:16"] as Ratio[]).map((r) => {
              const isActive = ratio === r;
              return (
                <button
                  key={r}
                  role="tab"
                  id={`ratio-tab-${r.replace(":", "-")}`}
                  aria-selected={isActive}
                  onClick={() => setRatio(r)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "0 10px",
                    height: 28,
                    borderRadius: "calc(var(--vm-radius-md) - 3px)",
                    background: isActive
                      ? "rgba(79,119,255,0.15)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(79,119,255,0.35)"
                      : "1px solid transparent",
                    color: isActive
                      ? "var(--vm-accent)"
                      : "var(--vm-text-muted)",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r === "16:9" ? (
                    <Monitor size={12} strokeWidth={2} />
                  ) : (
                    <Smartphone size={12} strokeWidth={2} />
                  )}
                  {r}
                </button>
              );
            })}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* ── Char count hint ── */}
          {prompt.length > 0 && (
            <span
              style={{
                fontSize: 12,
                color: "var(--vm-text-muted)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {prompt.length} chars · Ctrl+Enter to send
            </span>
          )}

          {/* ── Send Button ── */}
          <button
            id="prompt-send-btn"
            aria-label="Generate video"
            disabled={!prompt.trim() || isGenerating}
            onClick={handleGenerate}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "0 18px",
              height: 36,
              borderRadius: "var(--vm-radius-md)",
              background:
                !prompt.trim() || isGenerating
                  ? "var(--vm-subtle)"
                  : "var(--vm-cta-gradient)",
              border: "none",
              color:
                !prompt.trim() || isGenerating
                  ? "var(--vm-text-muted)"
                  : "#fff",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor:
                !prompt.trim() || isGenerating ? "not-allowed" : "pointer",
              transition: "all 0.25s ease",
              boxShadow:
                prompt.trim() && !isGenerating
                  ? "0 2px 12px rgba(79,119,255,0.35)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (prompt.trim() && !isGenerating) {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "var(--vm-glow-accent)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                prompt.trim() && !isGenerating
                  ? "0 2px 12px rgba(79,119,255,0.35)"
                  : "none";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            {isGenerating ? (
              <>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    display: "inline-block",
                    animation: "vm-spin-slow 0.7s linear infinite",
                  }}
                />
                Generating…
              </>
            ) : (
              <>
                <Send size={14} strokeWidth={2.5} />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hint below */}
      <p
        style={{
          textAlign: "center",
          marginTop: 12,
          fontSize: 12,
          color: "var(--vm-text-muted)",
          fontFamily: "DM Sans, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Sparkles size={11} />
        Powered by VidMotionAI · Avg. generation time ~{duration === "5s" ? "8" : duration === "10s" ? "14" : duration === "15s" ? "20" : "28"}s
      </p>
    </div>
  );
}
