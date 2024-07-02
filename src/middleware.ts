import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = cookies().get("auth-token")?.value;

  console.log("session", session);
  if (!session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/courses/:path*", "/video-upload/:path*"],
};
