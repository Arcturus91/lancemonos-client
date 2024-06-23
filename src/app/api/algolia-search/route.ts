import algoliasearch from "algoliasearch/lite";

const indexNameSecret = process.env.ALGOLIA_INDEX_NAME as string;
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_KEY as string
);
const index = searchClient.initIndex(indexNameSecret);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    if (!query) return;
    const algoliaData = await index.search(query);

    return new Response(JSON.stringify(algoliaData));
  } catch (error) {
    console.error(error);
  }
}
