import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
} from "react";

import { HitSearch } from "../../types";
import SuggestionsListComponent from "./Autocomplete";
import { useRouter } from "next/navigation";

const AlgoliaSearchComponent = () => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [availableToResearch, setAvailableToResearch] = useState<boolean>(true);
  const newRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (newRef.current && !newRef.current.contains(event.target as Node)) {
        if (showSuggestions) setShowSuggestions(false);
        setAvailableToResearch(true);
        setInput("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSuggestions]);

  useEffect(() => {
    if (!availableToResearch || input.length < 3) return;

    const fetchSuggestions = async () => {
      try {
        setShowSuggestions(true);

        const algoliaResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/algolia?query=${input}`
        );

        if (!algoliaResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const { hits } = await algoliaResponse.json();
        const arraySuggestions: string[] = hits.map(
          (h: Partial<HitSearch>) => h.videoTitle ?? "video no encontrado"
        );
        setSuggestions(arraySuggestions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestions();
  }, [input, availableToResearch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setAvailableToResearch(true);
  };

  const onClick = (index: number, suggestion: string) => {
    router.push(`courses/?item=${suggestion}`);
    setInput(suggestion);
    setShowSuggestions(false);
    setAvailableToResearch(false);
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
