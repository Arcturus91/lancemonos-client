"use client";
import Spinner from "@/app/components/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const VideoKeyphrases = () => {
  const [keyPhrases, setKeyPhrases] = useState<string[]>([]);
  const [editedKeyPhrases, setEditedKeyPhrases] = useState<string[]>([]);
  const [userFeedbackMessage, setUserFeedbackMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const videoName = searchParams.get("video-name");

  useEffect(() => {
    fetchKeyPhrases();
  }, [videoName]);

  const fetchKeyPhrases = async () => {
    if (!videoName) {
      setError("Video name is missing");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/video-keyphrases?video-name=${encodeURIComponent(videoName)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setKeyPhrases(data.keyphrases);
      setEditedKeyPhrases(data.keyphrases);
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message}\nIntenta con otro título de video`);
      } else {
        setError("Failed to fetch keyphrases. Please try again later.");
      }

      setTimeout(() => router.push("/courses"), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (index: number, value: string) => {
    const newKeyPhrases = [...editedKeyPhrases];
    newKeyPhrases[index] = value;
    setEditedKeyPhrases(newKeyPhrases);
  };

  const handleSave = async () => {
    if (!videoName) {
      setError("Video name is missing");
      return;
    }

    const finalKeyPhrases = editedKeyPhrases.filter(
      (key) => key.trim().length > 3
    );
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/keyphrase-save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoName, finalKeyPhrases }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { algoliaResponse, s3Response } = await response.json();

      if (
        algoliaResponse?.objectID &&
        algoliaResponse?.taskID &&
        s3Response["$metadata"] &&
        s3Response["$metadata"]["httpStatusCode"] === 200
      ) {
        setUserFeedbackMessage(
          "Las palabras principales fueron grabadas en Algolia y actualizadas en s3. Redireccionando..."
        );
        setTimeout(() => {
          router.push("/video-upload");
          localStorage.removeItem("courseContent");
        }, 2000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message}\nIntenta con otro título de video`);
      } else {
        setError("Failed to fetch keyphrases. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner size="medium" />;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Video Keyphrases</h1>
      <h2 className="text-red-500 font-bold mb-4">{videoName}</h2>

      {userFeedbackMessage ? (
        <h2 className="text-green-950">{userFeedbackMessage}</h2>
      ) : (
        editedKeyPhrases?.length > 0 && (
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
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default VideoKeyphrases;
