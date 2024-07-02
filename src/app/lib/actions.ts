export const apiGatewayResponse = async (email: string, password: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ROUTE}/prod/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_GATEWAY_KEY as string,
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // This is crucial for receiving and sending cookies
    }
  );
};
