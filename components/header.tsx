"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X, User as UserIcon } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Real auth state from Better Auth
  const { data: session } = useSession();
  const isLoggedIn = !!session;

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
              /* User Avatar/Logout */
              <button
                id="header-user-avatar"
                aria-label="Sign out"
                onClick={async () => {
                  await signOut();
                  window.location.href = "/";
                }}
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
                title="Sign out"
              >
                {session?.user?.name ? session.user.name.slice(0, 2).toUpperCase() : <UserIcon size={16} />}
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = "/sign-up")}
                className="vm-btn-cta"
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
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "box-shadow 0.25s ease, transform 0.2s ease",
                  boxShadow: "0 2px 12px rgba(79,119,255,0.3)",
                }}
              >
                Get Started
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              id="header-mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
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
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Drawer ── */}
      {isMobileMenuOpen && (
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
              onClick={() => setIsMobileMenuOpen(false)}
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
