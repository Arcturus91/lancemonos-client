import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const authTokenValue = cookies().get("auth-token")?.value ?? null;
  if (!authTokenValue) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const verified = await jwtVerify(authTokenValue, secret);
    console.log("User authenticated:", verified);
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/courses/:path*", "/video-upload/:path*"],
};
