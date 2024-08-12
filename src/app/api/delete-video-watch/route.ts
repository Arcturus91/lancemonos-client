import { NextResponse } from "next/server";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
  GetItemCommand,
  GetItemOutput,
} from "@aws-sdk/client-dynamodb";

const REGION = "sa-east-1";
const dynamoClient = new DynamoDBClient({ region: REGION });
const USER_TABLE = "lancemonos-users";

interface VideoWatched {
  videoName: string;
}
export async function POST(request: Request) {
  const user = { email: "rcollioa86@gmail.com" };
  const { videoName } = (await request.json()) as VideoWatched;

  if (!videoName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // First, we need to find the index of the videoKey in the list
    const getItemParams = {
      TableName: USER_TABLE,
      Key: {
        email: { S: user.email },
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
        email: { S: user.email },
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

    /*     if (!updateToDeleteParams.ExpressionAttributeNames) {
      updateToDeleteParams.ExpressionAttributeNames = {};
    }

    updateToDeleteParams.ExpressionAttributeNames[":#index"] =
      indexToRemove.toString(); */

    const command = new UpdateItemCommand(updateToDeleteParams);
    const response = await dynamoClient.send(command);
    console.log("Update succeeded:", response);

    return NextResponse.json(response);
  } catch (error) {
    /*     if (error.name === "ConditionalCheckFailedException") {
        console.log("Video not in the list, no update needed");
      }  */

    console.log("general error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
