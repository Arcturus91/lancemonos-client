import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { streamToString } from "../utils/streamToString";

export async function GET(request: Request) {
  const s3Client = new S3Client({ region: process.env.AWS_REGION });
  const { searchParams } = new URL(request.url);
  const videoName = searchParams.get("video-name");
  console.log("video-name", videoName);
  const params = {
    Bucket: "lancemonos-video-keyphrases",
    Key: `keyphrases-${videoName}.json`,
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
