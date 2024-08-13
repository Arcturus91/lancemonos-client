import { NextResponse } from "next/server";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
  GetItemCommand,
  GetItemOutput,
} from "@aws-sdk/client-dynamodb";
import { validatePayloadInToken } from "../utils-serverSide/serverUtils";

const REGION = process.env.AWS_REGION;
const dynamoClient = new DynamoDBClient({ region: REGION });
const USER_TABLE = process.env.AWS_USER_TABLE;

interface VideoWatched {
  videoName: string;
}
export async function POST(request: Request) {
  const payload = await validatePayloadInToken();
  const userEmail = payload.email as string;

  if (!userEmail) {
    return NextResponse.json(
      { error: "User email not found in token" },
      { status: 400 }
    );
  }

  const { videoName } = (await request.json()) as VideoWatched;

  if (!videoName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const getItemParams = {
      TableName: USER_TABLE,
      Key: {
        email: { S: userEmail },
      },
      ProjectionExpression: "videosWatched",
    };

    const getItemCommand = new GetItemCommand(getItemParams);
    const getItemResponse = (await dynamoClient.send(
      getItemCommand
    )) as GetItemOutput;
    if (
      !getItemResponse ||
      !getItemResponse?.Item ||
      !getItemResponse?.Item?.videosWatched?.L
    ) {
      throw Error("getItemResponse undefined");
    }
    const videosWatched = getItemResponse.Item.videosWatched.L;
    const indexToRemove = videosWatched.findIndex((v) => v.S === videoName);
    console.log(
      "videos watched and index to remove",
      videosWatched,
      indexToRemove
    );
    if (indexToRemove === -1) {
      console.log("Video not found in the list");
      throw Error("indexToRemove undefined");
    }

    const updateToDeleteParams: UpdateItemCommandInput = {
      TableName: USER_TABLE,
      Key: {
        email: { S: userEmail },
      },
      UpdateExpression: `REMOVE #VW[${indexToRemove.toString()}]`,
      ConditionExpression: "contains(#VW, :videoKey)",
      ExpressionAttributeNames: {
        "#VW": "videosWatched",
      },
      ExpressionAttributeValues: {
        ":videoKey": { S: videoName },
      },
    };

    const command = new UpdateItemCommand(updateToDeleteParams);
    const response = await dynamoClient.send(command);
    console.log("Update succeeded:", response);

    return NextResponse.json(response);
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
