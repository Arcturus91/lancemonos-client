import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import {
  ONE_GB,
  PRESIGNED_POST_EXPIRATION_IN_SECONDS,
} from "@/app/constants/constants";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: filename,
      Conditions: [
        ["content-length-range", 0, ONE_GB * 2],
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "private",
        "Content-Type": contentType,
      },
      Expires: PRESIGNED_POST_EXPIRATION_IN_SECONDS,
    });

    return Response.json({ url, fields });
  } catch (error: any) {
    return Response.json({ error });
  }
}
