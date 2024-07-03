import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // Attempt to delete the cookie
    cookies().delete("auth-token");

    // Check if the cookie was successfully deleted
    const remainingCookie = cookies().get("auth-token");

    if (remainingCookie) {
      // If the cookie still exists, it wasn't deleted successfully
      console.error("Failed to delete auth-token cookie");
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

    // If we reach here, the cookie was successfully deleted
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
    // Log the error for server-side debugging
    console.error("Error during logout:", error);

    // Return a generic error message to the client
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
