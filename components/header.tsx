"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, User, Menu, X, ChevronRight } from "lucide-react";

// ── Mock auth state (replace with real auth) ──
const MOCK_IS_LOGGED_IN = false;
const MOCK_USER = { name: "Alex Rivera", initials: "AR" };

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = MOCK_IS_LOGGED_IN;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          display: "flex",
          alignItems: "center",
          background: scrolled
            ? "rgba(255,255,255,0.94)"
            : "rgba(245,246,255,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid var(--vm-border)"
            : "1px solid transparent",
          transition:
            "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(67,97,238,0.1), 0 1px 4px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            id="header-logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--vm-radius-sm)",
                background: "var(--vm-cta-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 0 16px rgba(79,119,255,0.5)",
              }}
            >
              <Zap size={17} color="#fff" strokeWidth={2.5} />
            </span>
            <span
              style={{
                fontFamily: "Syne, system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: "-0.02em",
                background: "var(--vm-cta-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VidMotionAI
            </span>
          </Link>

          {/* ── Nav Links (desktop) ── */}
          <nav
            aria-label="Main navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flex: 1,
              justifyContent: "center",
            }}
            className="vm-nav-desktop"
          >
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Right: Auth ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            {isLoggedIn ? (
              /* User Avatar */
              <button
                id="header-user-avatar"
                aria-label="User profile"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--vm-cta-gradient)",
                  border: "2px solid var(--vm-border-active)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#fff",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--vm-accent)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--vm-glow-accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--vm-border-active)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {MOCK_USER.initials}
              </button>
            ) : (
              /* Get Started Button */
              <Link
                href="/signup"
                id="header-get-started"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0 18px",
                  height: 36,
                  borderRadius: "var(--vm-radius-full)",
                  background: "var(--vm-cta-gradient)",
                  color: "#fff",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "box-shadow 0.25s ease, transform 0.2s ease",
                  boxShadow: "0 2px 12px rgba(79,119,255,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--vm-glow-accent)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 12px rgba(79,119,255,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                Get Started
                <ChevronRight size={14} strokeWidth={2.5} />
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              id="header-mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="vm-mobile-menu-btn"
              style={{
                display: "none",
                width: 36,
                height: 36,
                borderRadius: "var(--vm-radius-sm)",
                background: "transparent",
                border: "1px solid var(--vm-border)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--vm-text-secondary)",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Drawer ── */}
      {mobileOpen && (
        <div
          className="vm-mobile-nav"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--vm-border)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            animation: "vm-fade-up 0.2s ease both",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 16px",
                borderRadius: "var(--vm-radius-md)",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                fontSize: 16,
                color: "var(--vm-text-secondary)",
                textDecoration: "none",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--vm-elevated)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--vm-text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--vm-text-secondary)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 767px) {
          .vm-nav-desktop { display: none !important; }
          .vm-mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        padding: "6px 14px",
        borderRadius: "var(--vm-radius-md)",
        fontFamily: "DM Sans, sans-serif",
        fontWeight: 500,
        fontSize: 14,
        color: "var(--vm-text-secondary)",
        textDecoration: "none",
        transition: "color 0.2s ease, background 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color =
          "var(--vm-text-primary)";
        (e.currentTarget as HTMLElement).style.background =
          "rgba(67,97,238,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color =
          "var(--vm-text-secondary)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
    </Link>
  );
}
