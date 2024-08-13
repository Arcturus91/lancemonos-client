import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { validatePayloadInToken } from "../utils-serverSide/serverUtils";
import { NextResponse } from "next/server";
const oneGB = 1073741824;

export async function POST(request: Request) {
  try {
    await validatePayloadInToken();
    const { filename, contentType } = await request.json();
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: filename,
      Conditions: [
        ["content-length-range", 0, oneGB * 2], //can upload up to 2gb files
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "private",
        "Content-Type": contentType,
      },
      Expires: 1800, // Seconds before the presigned post expires. 30 minutes uploading video
    });

    return Response.json({ url, fields });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error && error.message === "No auth token found") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
