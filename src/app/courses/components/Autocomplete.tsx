"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";
interface SuggestionListProps {
  suggestions: string[];
  onClick: (index: number, suggestion: string) => void;
}

const SuggestionsListComponent: React.FC<SuggestionListProps> = ({
  suggestions,
  onClick,
}) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);

  const handleItemClick = (index: number, suggestion: string) => {
    setActiveSuggestionIndex(index);
    onClick(index, suggestion);
  };

  return suggestions.length ? (
    <ul className="suggestions-container w-full bg-white border border-gray-300 rounded shadow-lg">
      {suggestions.map((suggestion, index) => {
        let className =
          index === activeSuggestionIndex ? "p-2 bg-gray-100" : "p-2";
        return (
          <li
            className={className}
            key={suggestion}
            onClick={() => handleItemClick(index, suggestion)}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="w-full p-2 bg-white border border-gray-300 rounded shadow-lg">
      <em>Porfavor, escribe de nuevo</em>
    </div>
  );
};
export default SuggestionsListComponent;
