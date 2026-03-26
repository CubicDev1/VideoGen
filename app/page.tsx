import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsGallery } from "@/components/projects-gallery";

export default function Home() {
  return (
    <>
      {/* Fixed header – sits on top, 64px tall */}
      <Header />

      {/* Page body – padded top so content starts below the fixed header */}
      <main
        style={{
          paddingTop: 64,
          background: "var(--vm-bg)",
          minHeight: "100vh",
        }}
      >
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Projects Gallery ── */}
        <section style={{ paddingBottom: 100 }}>
          <ProjectsGallery />
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--vm-border)",
          padding: "32px 24px",
          textAlign: "center",
          background: "var(--vm-bg)",
        }}
      >
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 13,
            color: "var(--vm-text-muted)",
          }}
        >
          © 2026 VidMotionAI. All rights reserved.{" "}
          <a
            href="/privacy"
            style={{ color: "var(--vm-accent)", textDecoration: "none" }}
          >
            Privacy
          </a>{" "}
          ·{" "}
          <a
            href="/terms"
            style={{ color: "var(--vm-accent)", textDecoration: "none" }}
          >
            Terms
          </a>
        </p>
      </footer>
    </>
  );
}
