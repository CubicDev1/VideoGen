"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await signUp.email({
      email: form.email,
      password: form.password,
      name: form.name,
      // Provide a callback or await directly.
    });

    if (error) {
      setError(error.message || "Failed to sign up.");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--vm-bg)",
        position: "relative",
      }}
    >
      {/* Background Decor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vm-hero-gradient)",
          pointerEvents: "none",
        }}
      />
      <div
        className="vm-card vm-glass vm-animate-fade-up"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 420,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "var(--vm-cta-gradient)",
              marginBottom: 16,
              boxShadow: "var(--vm-glow-accent)",
            }}
          >
            <Sparkles size={24} color="#fff" />
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "var(--vm-text-primary)",
              marginBottom: 8,
            }}
          >
            Create an Account
          </h1>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 14,
              color: "var(--vm-text-secondary)",
            }}
          >
            Get 100 free credits and start generating cinematic videos instantly.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              background: "rgba(224, 45, 78, 0.1)",
              border: "1px solid var(--vm-error)",
              borderRadius: "var(--vm-radius-md)",
              color: "var(--vm-error)",
              fontSize: 14,
              fontFamily: "DM Sans, sans-serif",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={handleSubmit}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--vm-text-primary)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--vm-bg)",
                border: "1px solid var(--vm-border)",
                borderRadius: "var(--vm-radius-md)",
                color: "var(--vm-text-primary)",
                outline: "none",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 15,
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--vm-accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--vm-border)")}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--vm-text-primary)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Email
            </label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--vm-bg)",
                border: "1px solid var(--vm-border)",
                borderRadius: "var(--vm-radius-md)",
                color: "var(--vm-text-primary)",
                outline: "none",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 15,
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--vm-accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--vm-border)")}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--vm-text-primary)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--vm-bg)",
                border: "1px solid var(--vm-border)",
                borderRadius: "var(--vm-radius-md)",
                color: "var(--vm-text-primary)",
                outline: "none",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 15,
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--vm-accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--vm-border)")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="vm-btn-cta"
            style={{
              padding: "14px",
              marginTop: 8,
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", borderTop: "1px solid var(--vm-border)", paddingTop: 20 }}>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--vm-text-secondary)" }}>
            Already have an account?{" "}
            <a href="/sign-in" style={{ color: "var(--vm-accent)", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
