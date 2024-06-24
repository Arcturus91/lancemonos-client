"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const VideoKeyphrases = () => {
  const [keyPhrases, setKeyPhrases] = useState<string[]>([]);
  const [editedKeyPhrases, setEditedKeyPhrases] = useState<string[]>([]);
  const [userFeedbackMessage, setUserFeedbackMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const videoName = searchParams.get("video-name");

  useEffect(() => {
    const getKeyPhrasesArray = async () => {
      try {
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

        const data = await response.json();
        if (!data?.keyphrases && data?.name === "NoSuchKey") {
          setUserFeedbackMessage(
            "El video no se encontró. Revise el nombre del video otra vez..."
          );
          setTimeout(() => {
            router.push("/video-upload");
          }, 5000);
          return [];
        }
        return data.keyphrases;
      } catch (error: any) {
        console.error(error);
        return [];
      }
    };

    const fetchAndSetKeyPhrases = async () => {
      try {
        const keyPhrasesArray = await getKeyPhrasesArray();
        setKeyPhrases(keyPhrasesArray);
        setEditedKeyPhrases(keyPhrasesArray);
      } catch (error) {
        console.error(error);
        setKeyPhrases([]);
        setEditedKeyPhrases([]);
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
    const videoName = searchParams.get("video-name");
    const finalKeyPhrases = editedKeyPhrases.filter((key) => key.length > 3);
    //!SI modificamos los keyphrases, estos deberían ir tmb al s3 bucket tal qe si quieres  modificar de nuevo, comienzas desde la última modificación
    const saveKeyPhrasesInAlgolia = async (finalKeyPhrases: string[]) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/algolia-save-object",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoName, finalKeyPhrases }),
        }
      );
      const responseData = await response.json();
      console.log("response data of creating object in algolia", responseData);
      if (responseData?.objectID && responseData?.taskID) {
        setUserFeedbackMessage(
          "Las palabras principales fueron grabadas en Algolia. Redireccionando..."
        );
        setTimeout(() => {
          router.push("/video-upload");
        }, 5000);
      }
    };

    saveKeyPhrasesInAlgolia(finalKeyPhrases);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Video Keyphrases</h1>
      <h2 className="text-red-500 font-bold mb-4">{videoName}</h2>

      <Suspense fallback={<h2 className="text-red-600">Cargando...</h2>}>
        {userFeedbackMessage.length === 0 && editedKeyPhrases?.length > 0 && (
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
        {userFeedbackMessage.length > 0 && (
          <h2 className="text-green-950">{userFeedbackMessage}</h2>
        )}
      </Suspense>
    </div>
  );
};

export default VideoKeyphrases;
