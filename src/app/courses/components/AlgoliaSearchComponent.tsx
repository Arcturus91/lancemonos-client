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
import { videoTitleFullList } from "../videoTitleFullList";

const AlgoliaSearchComponent = () => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [availableToResearch, setAvailableToResearch] = useState<boolean>(true);
  const newRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const checkTitle = (input: string, limit: number = 5) => {
    const lowercaseInput = input.toLowerCase();
    const videoTitlesFullList = Object.entries(videoTitleFullList);

    const arraySuggestions = videoTitlesFullList
      .filter(([key]) => {
        const lowercaseKey = key.toLowerCase();
        return lowercaseInput
          .split(" ")
          .every((word) => lowercaseKey.includes(word));
      })
      .sort(([keyA], [keyB]) => {
        const matchesA = keyA.toLowerCase().split(lowercaseInput).length - 1;
        const matchesB = keyB.toLowerCase().split(lowercaseInput).length - 1;
        return matchesB - matchesA;
      })
      .map(([, value]) => value)
      .slice(0, limit);

    console.log(input, arraySuggestions);
    if (arraySuggestions.length > 0) {
      setShowSuggestions(true);
      setSuggestions(arraySuggestions);
    }
  };

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

    if (input.length <= 7 && input.length >= 3) return checkTitle(input);

    const fetchSuggestions = async () => {
      try {
        setShowSuggestions(true);

        const algoliaResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/algolia-search?query=${input}`
        );

        if (!algoliaResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const { hits } = await algoliaResponse.json();
        console.log("hits! in search ocmponent", hits);
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
