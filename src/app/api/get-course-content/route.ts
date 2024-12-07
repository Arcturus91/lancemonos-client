import { VideoContent } from "@/app/types";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const REGION = process.env.AWS_REGION;
const client = new DynamoDBClient({ region: REGION });
const courseContentTable = process.env.CONTENT_TABLE;

export async function GET(): Promise<Response> {
  const params = {
    TableName: courseContentTable,
  };

  try {
    const command = new ScanCommand(params);
    const response = await client.send(command);

    if (!response?.Items) throw new Error("items undefined");

    const normalizedData: VideoContent[] = response.Items.map((item: any) => {
      return {
        videoUrl: item.videoUrl.S,
        videoKey: item.videoKey.S,
        videoName: item.videoName.S,
        videoSection: item.videoSection.S,
        sectionOrder: item.sectionOrder.N,
      };
    });

    //console.log("success scanning db table", normalizedData);
    return new Response(JSON.stringify(normalizedData));
  } catch (error) {
    console.error("There is an error getting content!: ", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
