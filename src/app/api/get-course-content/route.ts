import { VideoContent } from "@/app/types";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const REGION = "sa-east-1";
const client = new DynamoDBClient({ region: REGION });
const courseContentTable = "CourseContent";

export async function GET(): Promise<Response> {
  const params = {
    TableName: courseContentTable,
  };

  try {
    const command = new ScanCommand(params);
    const response = await client.send(command);
    console.log("success scanning db table", response);

    if (!response?.Items) throw new Error("items undefined");

    const normalizedData: VideoContent[] = response.Items.map((item: any) => {
      return {
        videoUrl: item.videoUrl.S,
        videoKey: item.videoKey.S,
        videoName: item.videoName.S,
        videoSection: item.videoSection.S,
      };
    });

    return new Response(JSON.stringify(normalizedData));
  } catch (error) {
    console.error("There is an error getting content!: ", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
