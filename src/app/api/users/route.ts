export async function GET(request: Request) {
  const users = [
    { id: 1, name: "arturo", email: "arturo@gmail.com" },

    { id: 2, name: "arturo2", email: "arturo2@gmail.com" },
  ];

  return new Response(JSON.stringify(users));
}
