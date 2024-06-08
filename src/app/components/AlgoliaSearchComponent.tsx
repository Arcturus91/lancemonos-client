"use client";

import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
const indexNameSecret = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);
type HitSearch = {
  keyPhrases: string;
  objectID: string;
  videoTitle: string;
};

type SearchResponse = {
  hit: HitSearch;
  sendEvent: any;
};

function Hit(searchResponse: SearchResponse) {
  const { hit } = searchResponse;
  console.log(searchResponse);
  return (
    <article>
      <p>{hit.videoTitle}</p>
    </article>
  );
}

const AlgoliaSearchComponent = () => {
  return (
    <InstantSearch indexName={indexNameSecret} searchClient={searchClient}>
      <SearchBox placeholder="Busca por temas" />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

export default AlgoliaSearchComponent;
