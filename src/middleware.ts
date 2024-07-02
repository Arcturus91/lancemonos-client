import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = cookies().get("auth-token")?.value;
  console.log("session", session);
  return null;
}
