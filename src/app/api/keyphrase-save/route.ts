import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { validatePayloadInToken } from "../utils-serverSide/serverUtils";

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID as string;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;
const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY as string;
const AWS_BUCKET_NAME_KEYPHRASES = process.env.AWS_BUCKET_NAME_KEYPHRASES;
const AWS_REGION = "sa-east-1";

const s3Client = new S3Client({ region: AWS_REGION });

interface KeyPhrasesData {
  finalKeyPhrases: string[];
  videoName: string;
}

interface AlgoliaRequestBody {
  videoTitle: string;
  finalKeyPhrases: string[];
}

const ALGOLIA_API_URL = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}`;

async function saveToAlgolia(data: AlgoliaRequestBody): Promise<any> {
  const response = await fetch(ALGOLIA_API_URL, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": ALGOLIA_WRITE_API_KEY,
      "X-Algolia-Application-Id": ALGOLIA_APP_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Algolia API error: ${response.statusText}`);
  }

  return response.json();
}

async function saveToS3(videoName: string, keyphrases: string[]): Promise<any> {
  const keyphraseObjectKey = `keyphrases-${videoName}.json`;
  const objectBody = JSON.stringify({ keyphrases });

  const putObjectParams = {
    Bucket: AWS_BUCKET_NAME_KEYPHRASES,
    Key: keyphraseObjectKey,
    Body: objectBody,
    ContentType: "application/json",
  };

  return s3Client.send(new PutObjectCommand(putObjectParams));
}

export async function POST(request: Request) {
  try {
    await validatePayloadInToken();

    const { finalKeyPhrases, videoName } =
      (await request.json()) as KeyPhrasesData;

    if (!finalKeyPhrases || !videoName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [algoliaResponse, s3Response] = await Promise.all([
      saveToAlgolia({ videoTitle: videoName, finalKeyPhrases }),
      saveToS3(videoName, finalKeyPhrases),
    ]);

    return NextResponse.json({ algoliaResponse, s3Response });
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
