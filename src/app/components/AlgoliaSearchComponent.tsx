"use client";

import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import algoliasearch from "algoliasearch/lite";
import Autocomplete from "./Autocomplete";
import { HitSearch, SearchResponse } from "../types";
import SuggestionsListComponent from "./Autocomplete";

const indexNameSecret = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);

const index = searchClient.initIndex(indexNameSecret);

const AlgoliaSearchComponent = () => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState(
    ([""] as string[]) || undefined
  );

  useEffect(() => {
    if (input.length < 3) return;
    console.warn("CALL TO ALGOLIA");
    setShowSuggestions(true);
    index.search(input).then(({ hits }) => {
      const arraySuggestions: string[] = hits.map((h: Partial<HitSearch>) => {
        const videoTitle = h.videoTitle ?? "video no encontrado";
        return videoTitle;
      });
      console.log(arraySuggestions);
      setSuggestions(arraySuggestions);
    });
  }, [input]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);
    console.log("input", input);
  };

  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    console.log("onclick reached");
    //setSuggestions([""]);
    //setInput(e.currentTarget.innerText);
    //setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-64">
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        value={input}
        onChange={onChange}
      />
      {showSuggestions && (
        <SuggestionsListComponent suggestions={suggestions} onClick={onClick} />
      )}
    </div>
  );
};

export default AlgoliaSearchComponent;
