import { NextResponse } from "next/server";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { validatePayloadInToken } from "../utils-serverSide/serverUtils";

const REGION = process.env.AWS_REGION;
const dynamoClient = new DynamoDBClient({ region: REGION });
const USER_TABLE = process.env.AWS_USER_TABLE;

interface VideoWatched {
  videoKey: string;
}

export async function POST(request: Request) {
  try {
    const payload = await validatePayloadInToken();
    const userEmail = payload.email as string;

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found in token" },
        { status: 400 }
      );
    }

    const { videoKey } = (await request.json()) as VideoWatched;

    if (!videoKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const params: UpdateItemCommandInput = {
      TableName: USER_TABLE,
      Key: {
        email: { S: userEmail },
      },
      UpdateExpression:
        "SET #VW = list_append(if_not_exists(#VW, :empty_list), :newVideo)",
      ConditionExpression: "NOT contains(#VW, :videoKey)",
      ExpressionAttributeNames: {
        "#VW": "videosWatched",
      },
      ExpressionAttributeValues: {
        ":newVideo": { L: [{ S: videoKey }] },
        ":empty_list": { L: [] },
        ":videoKey": { S: videoKey },
      },
    };

    const command = new UpdateItemCommand(params);
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
