import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    cookies().delete("auth-token");
    cookies().delete("userData");
    const remainingCookie = cookies().get("auth-token");
    if (remainingCookie?.value) {
      console.error("Failed to delete auth-token cookie", remainingCookie);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Logout failed: Unable to remove authentication token",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Logged out successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected error occurred during logout",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
