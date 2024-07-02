import { cookies } from "next/headers";

export async function getSession() {
  const session = cookies().get("auth-token")?.value;
  if (!session) return null;
}
