import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only the truly private surfaces are redirected here. The course reader
// pages (/field-guide, /certification, /inner-circle) handle their own auth
// so everyone can preview the content without being bounced to /login.
const PROTECTED_PREFIXES = ["/dashboard", "/account"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (!isProtected) return NextResponse.next();

  // NextAuth sets either `authjs.session-token` or `__Secure-authjs.session-token`.
  const sessionCookie =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
