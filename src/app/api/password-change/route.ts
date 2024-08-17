import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const normalizeVideosWatched = (videosWatched: any[]) => {
  return videosWatched.map((item) => item.S);
};

export async function POST(request: Request) {
  try {
    const { email, password, newPassword } = await request.json();

    if (!email || !password || !newPassword) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const apiGatewayPassChangeResponse = await fetch(
      `${process.env.AWS_API_GATEWAY_ROUTE}/prod/pass-change`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_GATEWAY_KEY as string,
        },
        body: JSON.stringify({ email, password, newPassword }),
        credentials: "include",
      }
    );

    if (!apiGatewayPassChangeResponse.ok) {
      const errorData = await apiGatewayPassChangeResponse.json();
      return NextResponse.json(
        { error: errorData.message || "An error occurred during login" },
        { status: apiGatewayPassChangeResponse.status }
      );
    }

    const apiGatewayPassChange = await apiGatewayPassChangeResponse.json();

    const { body, token, message } = apiGatewayPassChange;
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
    console.log("auth login - passchange", body);
    const { user } = body;
    const videosWatched = normalizeVideosWatched(user.videosWatched);
    const refactoredUserData = { ...user, videosWatched };
    return NextResponse.json({ success: true, body: refactoredUserData });
  } catch (error) {
    console.error("Error in password change route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
