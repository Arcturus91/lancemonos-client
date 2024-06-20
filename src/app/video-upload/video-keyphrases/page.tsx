"use client";
import React, { useEffect, useState } from "react";

const VideoKeyphrases = () => {
  const [keyPhrases, setKeyPhrases] = useState<string[]>([]);
  const [editedKeyPhrases, setEditedKeyPhrases] = useState<string[]>([]);

  useEffect(() => {
    const getKeyPhrasesArray = async () => {
      const videoName = "cosas-esenciales-primera-cita";
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          `/video-keyphrases?video-name=${videoName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error fetching", response);
      }
      const data = await response.json();
      return data.keyphrases;
    };

    const fetchAndSetKeyPhrases = async () => {
      try {
        const keyPhrasesArray = await getKeyPhrasesArray();
        setKeyPhrases(keyPhrasesArray);
        setEditedKeyPhrases(keyPhrasesArray);
        console.log("Keyphrases array", keyPhrasesArray);
      } catch (error) {
        console.error("Error fetching key phrases:", error);
      }
    };

    fetchAndSetKeyPhrases();
  }, []);

  const handleEdit = (index: number, value: string) => {
    const newKeyPhrases = [...editedKeyPhrases];
    newKeyPhrases[index] = value;
    setEditedKeyPhrases(newKeyPhrases);
  };

  const handleSave = () => {
    const finalKeyPhrases = editedKeyPhrases.filter((key) => key.length > 3);
    console.log("Saved key phrases:", finalKeyPhrases);
    // TODO: Implement API call to save edited key phrases
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Video Keyphrases</h1>
      {editedKeyPhrases.length > 0 && (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Key Phrase</th>
                <th className="text-left p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {editedKeyPhrases.map((keyPhrase, index) => (
                <tr key={index}>
                  <td className="p-2 border-b">
                    <input
                      type="text"
                      value={keyPhrase}
                      onChange={(e) => handleEdit(index, e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleEdit(index, "")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoKeyphrases;
