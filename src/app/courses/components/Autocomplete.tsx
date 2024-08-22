"use client";

import React, { useState } from "react";

interface SuggestionListProps {
  suggestions: string[];
  onClick: (index: number, suggestion: string) => void;
  isLoading: boolean;
}

const SuggestionsListComponent: React.FC<SuggestionListProps> = ({
  suggestions,
  onClick,
  isLoading,
}) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);

  const handleItemClick = (index: number, suggestion: string) => {
    setActiveSuggestionIndex(index);
    onClick(index, suggestion);
  };

  if (isLoading) {
    return (
      <div className="w-full p-2 bg-white border border-gray-300 rounded shadow-lg">
        <em>Buscando...</em>
      </div>
    );
  }

  return suggestions.length ? (
    <ul className="w-full bg-white border border-gray-300 rounded shadow-lg md:max-h-[60vh] md:overflow-y-auto">
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
