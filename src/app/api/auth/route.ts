import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("pre post api gateway", email, password);
  try {
    const apiGatewayLoginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ROUTE}/prod/login`,
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

    const apiGatewayLogin = await apiGatewayLoginResponse.json();
    const { body, token } = apiGatewayLogin;

    const user = body.user;
    console.log(body);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      expires,
    });

    console.log("api gateway login response:", apiGatewayLogin);
    return new Response(JSON.stringify(apiGatewayLogin));
  } catch (error) {
    console.log("error fetching", error);
    return Response.json({ error });
  }
}
