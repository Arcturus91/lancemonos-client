const app_id = process.env.ALGOLIA_APP_ID as string;
const indexName = process.env.ALGOLIA_INDEX_NAME;
const writeApikey = process.env.ALGOLIA_WRITE_API_KEY as string;

const urlCreateObj = `https://${app_id}-dsn.algolia.net/1/indexes/${indexName}`;
export async function POST(request: Request) {
  const { finalKeyPhrases, videoName } = await request.json();
  console.log("pre post to algolia keypghrases", finalKeyPhrases, videoName);

  try {
    const response = await fetch(urlCreateObj, {
      method: "POST",
      headers: {
        "X-Algolia-API-Key": writeApikey,
        "X-Algolia-Application-Id": app_id,
      },
      body: JSON.stringify({
        videoTitle: videoName,
        finalKeyPhrases,
      }),
    });
    const algoliaData = await response.json();
    console.log("data fetched in api route", algoliaData);
    return new Response(JSON.stringify(algoliaData));
  } catch (error) {
    console.log("error fetching", error);
    return Response.json({ error });
  }
}
