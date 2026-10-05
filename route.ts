import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, COOKIE_MAX_AGE, checkPassword, expectedToken } from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: AUTH_COOKIE,
    value: await expectedToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

// Sign out: visit /api/password with a DELETE, or wire a button to it.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: AUTH_COOKIE, value: "", path: "/", maxAge: 0 });
  return res;
}
