import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const AWS_REGION = "sa-east-1";
const s3Client = new S3Client({ region: AWS_REGION });
export async function GET(): Promise<Response> {
  const command = new GetObjectCommand({
    Bucket: "lancemonos-html",
    Key: "sistema-lancemonos-nomas.html",
  });

  try {
    const response = await s3Client.send(command);
    const str = await response.Body?.transformToString();
    return new Response(JSON.stringify(str));
  } catch (error) {
    console.error("There is an error getting content!: ", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
