import React, {
  useRef,
  useEffect,
  useState,
  MouseEvent,
  ChangeEvent,
} from "react";
import algoliasearch from "algoliasearch/lite";

import { HitSearch } from "../types"; // Adjust the type imports as necessary
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [availableToResearch, setAvailableToResearch] = useState<boolean>(true);

  useEffect(() => {
    if (!availableToResearch) return;
    if (input.length < 3) return;

    console.log("ALOGLI REACHED");
    setShowSuggestions(true);
    index.search(input).then(({ hits }) => {
      const arraySuggestions: string[] = hits.map(
        (h: Partial<HitSearch>) => h.videoTitle ?? "video no encontrado"
      );
      setSuggestions(arraySuggestions);
    });
  }, [input, availableToResearch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setAvailableToResearch(true);
  };

  const onClick = (index: number, suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setAvailableToResearch(false);
  };

  const newRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e: any) => {
    console.log("click", e, newRef);
    if (newRef.current && !newRef.current.contains(e.target)) {
      console.log("Outside click");
      if (showSuggestions) setShowSuggestions(false);
      setAvailableToResearch(true);
      setInput("");
    }
  };

  return (
    <div className="relative w-64" ref={newRef}>
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
