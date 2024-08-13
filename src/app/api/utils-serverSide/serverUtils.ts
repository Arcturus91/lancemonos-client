import { Readable } from "stream";
import { JWTPayload, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

export async function validatePayloadInToken(): Promise<JWTPayload> {
  const authTokenValue = cookies().get("auth-token")?.value ?? null;
  if (!authTokenValue) {
    throw new Error("No auth token found");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(authTokenValue, secret);
  console.log("payload in cookie", payload);

  return payload;
}
