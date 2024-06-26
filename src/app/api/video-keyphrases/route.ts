import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { streamToString } from "../utils/streamToString";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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
  } catch (error: any) {
    console.log("Error reading JSON from S3:", error);
    return new Response(JSON.stringify(error));
  }
}
