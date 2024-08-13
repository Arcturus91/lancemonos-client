import { NextRequest, NextResponse } from "next/server";
import algoliasearch from "algoliasearch/lite";
import { validatePayloadInToken } from "../utils-serverSide/serverUtils";

const indexNameSecret = process.env.ALGOLIA_INDEX_NAME as string;
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_KEY as string
);
const index = searchClient.initIndex(indexNameSecret);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await validatePayloadInToken();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }
    const algoliaData = await index.search(query);

    return NextResponse.json(algoliaData);
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
