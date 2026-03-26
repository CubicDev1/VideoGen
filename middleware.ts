import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/sign-in", "/sign-up", "/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let public routes pass
  if (publicRoutes.includes(pathname) || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check session cookie from better-auth (by default 'better-auth.session_token')
  const sessionToken = request.cookies.get("better-auth.session_token");

  // If trying to access a protected route without a token
  if (!sessionToken && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
