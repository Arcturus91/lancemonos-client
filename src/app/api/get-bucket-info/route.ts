import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Define the type for S3 item information
interface S3ItemInfo {
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
  storageClass: string;
}

const REGION = process.env.AWS_REGION;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Initialize S3 client
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function GET(): Promise<Response> {
  if (!BUCKET_NAME) {
    return new Response(
      JSON.stringify({ error: "Bucket name not configured" }),
      { status: 500 }
    );
  }

  const params = {
    Bucket: BUCKET_NAME,
    MaxKeys: 1000, // Adjust this value based on your needs
  };

  try {
    const command = new ListObjectsV2Command(params);
    const response = await s3Client.send(command);

    if (!response.Contents) {
      return new Response(
        JSON.stringify({ message: "No items found in bucket" }),
        { status: 404 }
      );
    }

    console.log(JSON.stringify(response, null, 2));

    const items: S3ItemInfo[] = response.Contents.map((item) => ({
      key: item.Key ?? "",
      size: item.Size ?? 0,
      lastModified: item.LastModified ?? new Date(),
      etag: item.ETag?.replace(/"/g, "") ?? "",
      storageClass: item.StorageClass ?? "STANDARD",
    }));

    // If you need to handle pagination for buckets with more than MaxKeys items
    const hasMore = response.IsTruncated;
    const nextContinuationToken = response.NextContinuationToken;

    const result = {
      items,
      hasMore,
      nextContinuationToken,
      totalItems: items.length,
    };

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching S3 bucket contents:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch bucket contents",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}

// Optional: Handler for paginated requests
export async function getPaginatedItems(
  continuationToken?: string
): Promise<Response> {
  if (!BUCKET_NAME) {
    return new Response(
      JSON.stringify({ error: "Bucket name not configured" }),
      { status: 500 }
    );
  }

  const params = {
    Bucket: BUCKET_NAME,
    MaxKeys: 1000,
    ContinuationToken: continuationToken,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const response = await s3Client.send(command);

    if (!response.Contents) {
      return new Response(
        JSON.stringify({ message: "No items found in bucket" }),
        { status: 404 }
      );
    }

    const items: S3ItemInfo[] = response.Contents.map((item) => ({
      key: item.Key ?? "",
      size: item.Size ?? 0,
      lastModified: item.LastModified ?? new Date(),
      etag: item.ETag?.replace(/"/g, "") ?? "",
      storageClass: item.StorageClass ?? "STANDARD",
    }));

    const result = {
      items,
      hasMore: response.IsTruncated,
      nextContinuationToken: response.NextContinuationToken,
      totalItems: items.length,
    };

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching paginated S3 bucket contents:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch bucket contents",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
