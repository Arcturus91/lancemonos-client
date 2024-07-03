// pages/api/auth/check.ts
import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET(request: Request, response: Response) {
  const authTokenValue = cookies().get("auth-token")?.value ?? null;

  if (!authTokenValue) {
    return new Response(JSON.stringify({ isAuthenticated: false }));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(authTokenValue, secret);
    return new Response(JSON.stringify({ isAuthenticated: true }));
  } catch (error) {
    return new Response(JSON.stringify({ isAuthenticated: false }));
  }
}
