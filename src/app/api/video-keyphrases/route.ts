import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

export async function GET(request: Request) {
  const s3Client = new S3Client({ region: process.env.AWS_REGION });

  const params = {
    Bucket: "lancemonos-video-keyphrases",
    Key: "keyphrases-171881387520.json",
  };

  try {
    const { Body } = await s3Client.send(new GetObjectCommand(params));
    const bodyContents = await streamToString(Body as Readable);
    const contentS3 = JSON.parse(bodyContents);
    console.log("contentS3", contentS3);
    return new Response(JSON.stringify(contentS3));
  } catch (err: any) {
    console.log("Error reading JSON from S3:", err);
    const errorMessage = { errorReason: err?.name };
    return new Response(JSON.stringify(errorMessage));
  }
}
