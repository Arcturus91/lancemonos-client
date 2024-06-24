import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();
  const oneGB = 1073741824;
  try {
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
  } catch (error: any) {
    return Response.json({ error });
  }
}
