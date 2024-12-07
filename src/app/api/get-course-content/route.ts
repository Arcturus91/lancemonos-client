import { VideoContent, CourseItem } from "@/app/types";
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const REGION = process.env.AWS_REGION;
const client = new DynamoDBClient({ region: REGION });
const courseContentTable = process.env.CONTENT_TABLE;

export async function GET(): Promise<Response> {
  const params: ScanCommandInput = {
    TableName: courseContentTable,
  };

  try {
    const command = new ScanCommand(params);
    const response = await client.send(command);

    if (!response?.Items) throw new Error("items undefined");

    if (!response?.Items) throw new Error("items undefined");

    // Unmarshall the items
    const allCourseTree = response.Items.map((item) =>
      unmarshall(item)
    ) as CourseItem[];

    console.log("unmarshalled items:", allCourseTree);
    return new Response(JSON.stringify(allCourseTree));
  } catch (error) {
    console.error("There is an error getting content!: ", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
