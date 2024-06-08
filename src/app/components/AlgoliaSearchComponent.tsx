"use client";

import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  SearchBox,
  Highlight,
  Configure,
} from "react-instantsearch";
import { SearchResponse } from "../types";
console.log("enmviropnement", process.env.ALGOLIA_APP_ID);

const indexNameSecret = process.env.ALGOLIA_INDEX_NAME as string;
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_KEY as string
);

const Hit = (searchResponse: SearchResponse) => {
  const { hit } = searchResponse;
  return (
    <article
      onClick={() => {
        console.log("clicked!!!");
      }}
    >
      <button>
        <p>
          <Highlight attribute="videoTitle" hit={hit} />
        </p>
      </button>
    </article>
  );
};
const queryHook = (query: string, search: (a: string) => any) => {
  console.log(query, search);
  //search(query);
};

const AlgoliaSearchComponent = () => {
  return (
    <InstantSearch indexName={indexNameSecret} searchClient={searchClient}>
      <Configure hitsPerPage={7} />
      <div className="p-4 ">
        <SearchBox
          queryHook={queryHook}
          placeholder="Busca por temas"
          className="text-black w-full p-2 m-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="mt-4">
          <Hits hitComponent={Hit} />
        </div>
      </div>
    </InstantSearch>
  );
};

export default AlgoliaSearchComponent;
