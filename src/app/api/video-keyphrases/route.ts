import {
  S3Client,
  GetObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { streamToString } from "../utils-serverSide/streamToString";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const videoName = getVideoNameFromRequest(request);
    const keyphrases = await fetchKeyphrasesFromS3(videoName);
    return NextResponse.json(keyphrases);
  } catch (error) {
    console.error("Error processing request:", error);
    return handleError(error);
  }
}

function getVideoNameFromRequest(request: NextRequest): string {
  const { searchParams } = new URL(request.url);
  const videoName = searchParams.get("video-name");
  if (!videoName) {
    throw new Error("Missing 'video-name' parameter");
  }
  return videoName;
}

async function fetchKeyphrasesFromS3(videoName: string): Promise<unknown> {
  const params = {
    Bucket: "lancemonos-video-keyphrases",
    Key: `keyphrases-${videoName}.json`,
  };

  try {
    const { Body } = await s3Client.send(new GetObjectCommand(params));
    if (!Body) {
      throw new Error("Empty response body from S3");
    }
    const bodyContents = await streamToString(Body as Readable);
    return JSON.parse(bodyContents);
  } catch (error) {
    if (error instanceof S3ServiceException) {
      console.error("S3 Service Error:", error.message);
      throw new Error(`Failed to fetch keyphrases: ${error.message}`);
    }
    throw error;
  }
}

function handleError(error: unknown): NextResponse {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 }
  );
}
