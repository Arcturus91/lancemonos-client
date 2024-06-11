"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";

interface SuggestionListProps {
  suggestions: string[];
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
}

const SuggestionsListComponent: React.FC<SuggestionListProps> = ({
  suggestions,
  onClick,
}) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);

  return suggestions.length ? (
    <ul className="absolute z-10 left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow-lg">
      {suggestions.map((suggestion, index) => {
        let className =
          index === activeSuggestionIndex ? "p-2 bg-gray-100" : "p-2";
        return (
          <li className={className} key={suggestion} onClick={onClick}>
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="absolute left-0 right-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg">
      <em>No suggestions, you re on your own!</em>
    </div>
  );
};

/* const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);
    setFilteredSuggestions(
      suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
    );
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };





  return (
    <div className="relative w-64">
      <input
        type="text"
        onChange={onChange}
        value={input}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
};
 */
export default SuggestionsListComponent;
