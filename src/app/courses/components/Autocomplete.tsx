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
    setActiveSuggestionIndex(index); // Set the current active index
    onClick(index, suggestion); // Call the parent's onClick handler
  };

  return suggestions.length ? (
    <ul className="absolute z-10 left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow-lg">
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
    <div className="absolute left-0 right-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg">
      <em>Porfavor, escribe de nuevo</em>
    </div>
  );
};
export default SuggestionsListComponent;
