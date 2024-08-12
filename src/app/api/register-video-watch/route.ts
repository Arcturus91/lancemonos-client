import { NextResponse } from "next/server";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
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
  const params: UpdateItemCommandInput = {
    TableName: USER_TABLE,
    Key: {
      email: { S: user.email },
    },
    UpdateExpression:
      "SET #VW = list_append(if_not_exists(#VW, :empty_list), :newVideo)",
    ConditionExpression: "NOT contains(#VW, :videoKey)",
    ExpressionAttributeNames: {
      "#VW": "videosWatched",
    },
    ExpressionAttributeValues: {
      ":newVideo": { L: [{ S: videoName }] },
      ":empty_list": { L: [] },
      ":videoKey": { S: videoName },
    },
  };

  try {
    const command = new UpdateItemCommand(params);
    const response = await dynamoClient.send(command);
    console.log("Update succeeded:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error saving videos watched:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
