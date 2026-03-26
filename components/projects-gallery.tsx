"use client";

import React from "react";
import { Play, Eye, Heart } from "lucide-react";

// ── Types ──
interface VideoProject {
  id: string;
  title: string;
  author: string;
  authorInitials: string;
  duration: string;
  ratio: "16:9" | "9:16";
  views: string;
  likes: string;
  gradient: string;
  accentColor: string;
  timeAgo: string;
}

// ── Mock Data ──
const COMMUNITY_PROJECTS: VideoProject[] = [
  {
    id: "p1",
    title: "Neon City Flyover",
    author: "Maya Chen",
    authorInitials: "MC",
    duration: "15s",
    ratio: "16:9",
    views: "12.4K",
    likes: "891",
    gradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    accentColor: "#00d4aa",
    timeAgo: "2h ago",
  },
  {
    id: "p2",
    title: "Abstract Particle Storm",
    author: "Luca Romano",
    authorInitials: "LR",
    duration: "10s",
    ratio: "9:16",
    views: "8.7K",
    likes: "654",
    gradient: "linear-gradient(135deg, #1a0533, #3d0f6b, #6b21a8)",
    accentColor: "#a855f7",
    timeAgo: "5h ago",
  },
  {
    id: "p3",
    title: "Liquid Gold Motion",
    author: "Aria Patel",
    authorInitials: "AP",
    duration: "20s",
    ratio: "16:9",
    views: "31.2K",
    likes: "2.1K",
    gradient: "linear-gradient(135deg, #1a0a00, #3d1f00, #7c3a00)",
    accentColor: "#f59e0b",
    timeAgo: "1d ago",
  },
  {
    id: "p4",
    title: "Cosmic Warp Drive",
    author: "Jordan Kim",
    authorInitials: "JK",
    duration: "15s",
    ratio: "9:16",
    views: "19.8K",
    likes: "1.4K",
    gradient: "linear-gradient(135deg, #030712, #1e3a5f, #1d4ed8)",
    accentColor: "#4f77ff",
    timeAgo: "2d ago",
  },
  {
    id: "p5",
    title: "Ember Drift",
    author: "Sam Torres",
    authorInitials: "ST",
    duration: "5s",
    ratio: "16:9",
    views: "5.3K",
    likes: "412",
    gradient: "linear-gradient(135deg, #1c0a0a, #4a1010, #991b1b)",
    accentColor: "#ff4d6d",
    timeAgo: "3d ago",
  },
  {
    id: "p6",
    title: "Ocean Data Waves",
    author: "Fiona Wu",
    authorInitials: "FW",
    duration: "10s",
    ratio: "16:9",
    views: "22.1K",
    likes: "1.8K",
    gradient: "linear-gradient(135deg, #071b2f, #0c4a6e, #0284c7)",
    accentColor: "#00d4aa",
    timeAgo: "4d ago",
  },
];

const MY_PROJECTS: VideoProject[] = [
  {
    id: "my1",
    title: "Brand Reveal Intro",
    author: "You",
    authorInitials: "AR",
    duration: "10s",
    ratio: "16:9",
    views: "—",
    likes: "—",
    gradient: "linear-gradient(135deg, #0a0f2e, #1e2f6b, #3b5bdb)",
    accentColor: "#4f77ff",
    timeAgo: "Just now",
  },
  {
    id: "my2",
    title: "Product Launch Reel",
    author: "You",
    authorInitials: "AR",
    duration: "20s",
    ratio: "16:9",
    views: "—",
    likes: "—",
    gradient: "linear-gradient(135deg, #0f1a0a, #1a3d12, #166534)",
    accentColor: "#00d4aa",
    timeAgo: "Yesterday",
  },
  {
    id: "my3",
    title: "Reel — Summer Vibes",
    author: "You",
    authorInitials: "AR",
    duration: "15s",
    ratio: "9:16",
    views: "—",
    likes: "—",
    gradient: "linear-gradient(135deg, #1a0a00, #4a1f00, #b45309)",
    accentColor: "#f59e0b",
    timeAgo: "3 days ago",
  },
];

// ── Mock auth ──
const MOCK_IS_LOGGED_IN = false;

export function ProjectsGallery() {
  const isLoggedIn = MOCK_IS_LOGGED_IN;
  const projects = isLoggedIn ? MY_PROJECTS : COMMUNITY_PROJECTS;

  return (
    <section
      aria-label={isLoggedIn ? "Your projects" : "Community creations"}
      style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 28,
          gap: 16,
          flexWrap: "wrap",
        }}
        className="vm-animate-fade-up vm-delay-400"
      >
        <div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--vm-accent)",
              marginBottom: 6,
            }}
          >
            {isLoggedIn ? "Your workspace" : "Made with VidMotionAI"}
          </p>
          <h2
            style={{
              fontFamily: "Syne, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 30px)",
              color: "var(--vm-text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {isLoggedIn ? "Your Recent Videos" : "Community Creations"}
          </h2>
        </div>
        {isLoggedIn && (
          <a
            href="/projects"
            id="view-all-projects"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--vm-accent)",
              textDecoration: "none",
              fontFamily: "DM Sans, sans-serif",
              borderBottom: "1px solid rgba(79,119,255,0.3)",
              paddingBottom: 2,
              transition: "border-color 0.2s ease",
            }}
          >
            View all →
          </a>
        )}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            showAuthor={!isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  showAuthor,
}: {
  project: VideoProject;
  index: number;
  showAuthor: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);

  const aspectRatio = project.ratio === "16:9" ? "16/9" : "9/16";
  const maxHeight = project.ratio === "16:9" ? 180 : 280;

  return (
    <article
      id={`project-card-${project.id}`}
      className="vm-animate-fade-up"
      style={{
        animationDelay: `${400 + index * 80}ms`,
        background: "var(--vm-surface)",
        border: hovered
          ? "1px solid var(--vm-border-active)"
          : "1px solid var(--vm-border)",
        borderRadius: "var(--vm-radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        transition:
          "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s var(--vm-ease-spring)",
        transform: hovered ? "scale(1.02) translateY(-3px)" : "scale(1)",
        boxShadow: hovered ? "var(--vm-shadow-lg)" : "var(--vm-shadow-sm)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio,
          maxHeight,
          overflow: "hidden",
          background: project.gradient,
        }}
      >
        {/* Animated overlay pattern */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)",
            transition: "opacity 0.25s ease",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Cinematic lines decoration */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(255,255,255,0.015) 3px,
              rgba(255,255,255,0.015) 4px
            )`,
          }}
        />

        {/* Center glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: project.accentColor,
            opacity: hovered ? 0.2 : 0.1,
            filter: "blur(24px)",
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Duration badge */}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "3px 8px",
            borderRadius: "var(--vm-radius-sm)",
            background: "rgba(5,7,15,0.65)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.85)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            fontWeight: 500,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {project.duration}
        </span>

        {/* Ratio badge */}
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "3px 8px",
            borderRadius: "var(--vm-radius-sm)",
            background: "rgba(5,7,15,0.75)",
            backdropFilter: "blur(8px)",
            color: project.accentColor,
            fontFamily: "DM Sans, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            border: `1px solid ${project.accentColor}33`,
          }}
        >
          {project.ratio}
        </span>

        {/* Play button overlay on hover */}
        <button
          aria-label={`Play ${project.title}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.7})`,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease, transform 0.25s var(--vm-ease-spring)",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <Play size={16} fill="#fff" strokeWidth={0} style={{ marginLeft: 2 }} />
        </button>
      </div>

      {/* Card footer */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--vm-text-primary)",
                margin: "0 0 4px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {project.title}
            </h3>
            {showAuthor && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {/* Author avatar */}
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "var(--vm-cta-gradient)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {project.authorInitials}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--vm-text-secondary)",
                    fontFamily: "DM Sans, sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.author}
                </span>
              </div>
            )}
            {!showAuthor && (
              <span
                style={{
                  fontSize: 11,
                  color: "var(--vm-text-muted)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {project.timeAgo}
              </span>
            )}
          </div>

          {/* Stats */}
          {showAuthor && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
                  color: "var(--vm-text-muted)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                <Eye size={11} />
                {project.views}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
                  color: "var(--vm-text-muted)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                <Heart size={11} />
                {project.likes}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
