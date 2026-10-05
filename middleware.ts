import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, isProtectionEnabled, isValidToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (!isProtectionEnabled()) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (await isValidToken(token)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/password";
  url.search = "";
  const from = req.nextUrl.pathname + req.nextUrl.search;
  if (from !== "/") url.searchParams.set("from", from);
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except: the password page, its API route, Next internals,
  // and static files in /public (anything with a file extension).
  matcher: ["/((?!password|api/password|_next/static|_next/image|.*\\..*).*)"],
};
