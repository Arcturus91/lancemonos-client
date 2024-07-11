import { NextRequest, NextResponse } from "next/server";
import algoliasearch from "algoliasearch/lite";

const indexNameSecret = process.env.ALGOLIA_INDEX_NAME as string;
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_KEY as string
);
const index = searchClient.initIndex(indexNameSecret);

export const dynamic = "force-dynamic"; // This is the key change

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }
    const algoliaData = await index.search(query);

    return NextResponse.json(algoliaData);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
