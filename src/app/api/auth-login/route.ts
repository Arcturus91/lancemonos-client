import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const normalizeVideosWatched = (videosWatched: any[]) => {
  return videosWatched.map((item) => item.S);
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const apiGatewayLoginResponse = await fetch(
      `${process.env.AWS_API_GATEWAY_ROUTE}/prod/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_GATEWAY_KEY as string,
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!apiGatewayLoginResponse.ok) {
      const errorData = await apiGatewayLoginResponse.json();
      return NextResponse.json(
        { error: errorData.message || "An error occurred during login" },
        { status: apiGatewayLoginResponse.status }
      );
    }

    const apiGatewayLogin = await apiGatewayLoginResponse.json();

    const { body, token, message } = apiGatewayLogin;
    if (!token && message) {
      return NextResponse.json({ error: message }, { status: 500 });
    }

    if (!token) {
      return NextResponse.json(
        { error: "Token not received from API" },
        { status: 500 }
      );
    }

    const maxAge = 60 * 60 * 12;
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    console.log("auth login", body);
    const { user } = body;
    const videosWatched = normalizeVideosWatched(user.videosWatched);
    const refactoredUserData = { ...user, videosWatched };
    return NextResponse.json({ success: true, body: refactoredUserData });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
