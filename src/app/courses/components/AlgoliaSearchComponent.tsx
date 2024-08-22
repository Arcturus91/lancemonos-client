import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
} from "react";
import debounce from "lodash/debounce";
import { HitSearch } from "../../types";
import SuggestionsListComponent from "./Autocomplete";
import { useRouter } from "next/navigation";
import { videoTitleFullList } from "../videoTitleFullList";

interface AlgoliaSearchProps {
  handleVideoSelection: () => void;
}

const AlgoliaSearchComponent: React.FC<AlgoliaSearchProps> = ({
  handleVideoSelection,
}) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [availableToResearch, setAvailableToResearch] = useState<boolean>(true);
  const newRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const checkTitle = useCallback((input: string, limit: number = 5) => {
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
  }, []);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!availableToResearch || query.length < 3) {
        setSuggestions([]);
        return;
      }

      if (query.length <= 7) {
        checkTitle(query);
        return;
      }

      try {
        setShowSuggestions(true);

        const algoliaResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/algolia-search?query=${query}`
        );

        if (!algoliaResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const { hits } = await algoliaResponse.json();
        console.log("hits! in search component", hits);
        const arraySuggestions: string[] = hits.map(
          (h: Partial<HitSearch>) => h.videoTitle ?? "video no encontrado"
        );
        setSuggestions(arraySuggestions);
      } catch (error) {
        console.error(error);
      }
    },
    [availableToResearch, checkTitle]
  );

  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => fetchSuggestions(query), 500),
    [fetchSuggestions]
  );

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
    debouncedFetchSuggestions(input);

    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [input, debouncedFetchSuggestions]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setAvailableToResearch(true);
  };

  const onClick = (index: number, suggestion: string) => {
    router.push(`courses/?item=${suggestion}`);
    setInput(suggestion);
    setShowSuggestions(false);
    setAvailableToResearch(false);
    handleVideoSelection();
  };

  return (
    <div className="relative w-full md:w-64" ref={newRef}>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        value={input}
        onChange={onChange}
        placeholder="Buscar contenido..."
      />
      {showSuggestions && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 md:max-h-60 md:overflow-y-auto">
          <SuggestionsListComponent
            suggestions={suggestions}
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

export default AlgoliaSearchComponent;
