// Shared helpers for site password protection.
// Runs in both the Edge runtime (middleware) and Node (API route),
// so only Web Crypto is used here.

export const AUTH_COOKIE = "portfolio_auth";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function getPassword(): string | undefined {
  return process.env.PORTFOLIO_PASSWORD;
}

export function isProtectionEnabled(): boolean {
  // If no password is configured, the gate stays open in development
  // so you are never locked out locally. In production it stays closed.
  if (getPassword()) return true;
  return process.env.NODE_ENV === "production";
}

async function hmac(message: string): Promise<string> {
  const secret = `${getPassword() ?? ""}::${process.env.PORTFOLIO_SECRET ?? "finkenaur.design"}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// The cookie value is an HMAC of a fixed string keyed by the password.
// Changing PORTFOLIO_PASSWORD on Vercel instantly invalidates every existing cookie.
export async function expectedToken(): Promise<string> {
  return hmac("portfolio-access-v1");
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await expectedToken();
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export function checkPassword(input: string): boolean {
  const pw = getPassword();
  if (!pw) return false;
  if (input.length !== pw.length) return false;
  let diff = 0;
  for (let i = 0; i < pw.length; i++) diff |= input.charCodeAt(i) ^ pw.charCodeAt(i);
  return diff === 0;
}
