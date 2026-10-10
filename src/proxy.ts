import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const loggedIn = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);

  // Already logged in → skip the login page, go straight to the dashboard.
  if (pathname === "/admin/login") {
    if (loggedIn) return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  // Any other /admin route requires a valid session.
  if (!loggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
