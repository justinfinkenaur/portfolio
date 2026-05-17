"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      background: "#ffffff",
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: 380, textAlign: "center" }}>
        <h1 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 22,
          fontWeight: 400,
          color: "#1A1814",
          marginBottom: 8,
        }}>
          Justin Finkenaur
        </h1>
        <p style={{
          fontSize: 14,
          color: "#8A8680",
          marginBottom: 40,
        }}>
          Enter the password to view this portfolio.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
              border: `1px solid ${error ? "#c44" : "rgba(26,24,20,0.12)"}`,
              borderRadius: 8,
              outline: "none",
              background: "#fff",
              color: "#1A1814",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = error ? "#c44" : "#1A1814"}
            onBlur={(e) => e.target.style.borderColor = error ? "#c44" : "rgba(26,24,20,0.12)"}
          />
          {error && (
            <p style={{ fontSize: 13, color: "#c44", marginTop: 8, textAlign: "left" }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              marginTop: 16,
              padding: "14px 16px",
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              color: "#fff",
              background: loading || !password ? "#aaa" : "#1A1814",
              border: "none",
              borderRadius: 8,
              cursor: loading || !password ? "default" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Entering…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
