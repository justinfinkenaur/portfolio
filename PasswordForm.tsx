"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function PasswordForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(redirectTo);
        router.refresh();
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="pw-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="pw-input" className="pw-label">Password</label>
      <div className={`pw-field${status === "error" ? " is-error" : ""}`}>
        <input
          id="pw-input"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => { setPassword(e.target.value); if (status === "error") setStatus("idle"); }}
          placeholder="Enter password"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "pw-error" : undefined}
        />
        <button type="submit" className="btn btn-primary pw-submit" disabled={status === "loading" || !password}>
          {status === "loading" ? "Checking…" : "Continue"}
        </button>
      </div>
      <p id="pw-error" className="pw-error" role="alert" aria-live="polite">
        {status === "error" ? "That password didn't match. Try again." : "\u00a0"}
      </p>
    </form>
  );
}
