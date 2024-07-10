import { AUTH_TOKEN } from "@/app/constants/constants";
import { cookies } from "next/headers";

export async function getSession() {
  const session = cookies().get(AUTH_TOKEN)?.value;
  if (!session) return null;
}
