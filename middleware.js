// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Simplified CSP for testing
  res.headers.set("X-Frame-Options", "DENY");
  //   res.headers.set(
  //     "Content-Security-Policy",
  //     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
  //   );
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("X-Content-Type-Options", "nosniff");

  return res;
}

export const config = {
  matcher: "/:path*", // Apply this middleware to all routes
};
