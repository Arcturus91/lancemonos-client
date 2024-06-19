"use client";
import React, { useEffect, useState } from "react";

const VideoKeyphrases = () => {
  const [keyPhrases, setKeyPhrases] = useState<string[]>([""]);
  useEffect(() => {
    const getKeyPhrasesArray = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/video-keyphrases",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("error fetching", response);
      }
      const data = await response.json();
      return data.keyphrases;
    };

    const fetchAndSetKeyPhrases = async () => {
      try {
        const keyPhrasesArray = await getKeyPhrasesArray();
        setKeyPhrases(keyPhrasesArray);
        console.log("keyphrases array", keyPhrasesArray);
      } catch (error) {
        console.error("Error fetching key phrases:", error);
      }
    };

    fetchAndSetKeyPhrases();
  }, []);

  return (
    <div>
      <h1>Video Keyphrases</h1>
      {keyPhrases.length > 0 && (
        <ul>
          {keyPhrases.map((keyPhrase, index) => (
            <li key={index}>{keyPhrase}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoKeyphrases;
