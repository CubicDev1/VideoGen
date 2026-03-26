"use client";

import React from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { PromptBox } from "./prompt-box";

const STAT_ITEMS = [
  { value: "2M+", label: "Videos Generated" },
  { value: "140K+", label: "Active Creators" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 24px 80px",
        overflow: "hidden",
      }}
    >
      {/* ── Background layers ── */}

      {/* Aurora gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vm-hero-gradient)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Radial bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background:
            "linear-gradient(to bottom, transparent, var(--vm-bg))",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--vm-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--vm-border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.15,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 80%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(67,97,238,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "vm-float 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          right: "6%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "vm-float 11s ease-in-out infinite reverse",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 860,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Badge */}
        <div
          className="vm-animate-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 14px 6px 10px",
            borderRadius: "var(--vm-radius-full)",
            background: "rgba(79,119,255,0.1)",
            border: "1px solid rgba(79,119,255,0.25)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "var(--vm-cta-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={10} color="#fff" />
          </span>
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--vm-accent)",
              letterSpacing: "0.01em",
            }}
          >
            Next-gen AI video generation is here
          </span>
        </div>

        {/* Heading */}
        <h1
          className="vm-animate-fade-up vm-delay-100"
          style={{
            fontFamily: "Syne, system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 6.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textAlign: "center",
            marginBottom: 22,
            background: `
              linear-gradient(
                135deg,
                var(--vm-text-primary) 0%,
                #a8b8ff 40%,
                var(--vm-grad-end) 80%
              )
            `,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Turn Words Into{" "}
          <span
            style={{
              background: "var(--vm-cta-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Cinematic
          </span>
          <br />
          Videos Instantly
        </h1>

        {/* Subtitle */}
        <p
          className="vm-animate-fade-up vm-delay-200"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 2vw, 19px)",
            lineHeight: 1.65,
            color: "var(--vm-text-secondary)",
            textAlign: "center",
            maxWidth: 580,
            marginBottom: 48,
          }}
        >
          Describe your vision in plain language. VidMotionAI transforms your
          prompt into stunning, motion-rich videos in seconds — no editing
          skills required.
        </p>

        {/* Prompt Box */}
        <div
          className="vm-animate-fade-up vm-delay-300"
          style={{ width: "100%" }}
        >
          <PromptBox />
        </div>

        {/* Stats row */}
        <div
          className="vm-animate-fade-up vm-delay-400"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginTop: 56,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {STAT_ITEMS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Syne, system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    background: "var(--vm-cta-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 13,
                    color: "var(--vm-text-muted)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < STAT_ITEMS.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    width: 1,
                    height: 36,
                    background: "var(--vm-border)",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="vm-animate-fade-up vm-delay-500"
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "var(--vm-text-muted)",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Explore community
          </span>
          <ArrowDown
            size={16}
            color="var(--vm-text-muted)"
            style={{ animation: "vm-float 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
