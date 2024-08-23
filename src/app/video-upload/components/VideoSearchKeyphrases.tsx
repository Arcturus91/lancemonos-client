import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

interface VideoSearchKeyphrasesProps {
  videoKey: string;
}

const VideoSearchKeyphrases: React.FC<VideoSearchKeyphrasesProps> = ({
  videoKey,
}) => {
  const [videoName, setVideoName] = useState<string>(videoKey);
  const router = useRouter();

  useEffect(() => {
    setVideoName(videoKey);
  }, [videoKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/video-upload/video-keyphrases/?video-name=${encodeURIComponent(
        videoName
      )}`
    );
  };

  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoName(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Modifica las palabras clave</h1>
      <h2 className="text-xl mb-6">
        Tipea el nombre exacto con el que subiste el video
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <input
            id="videoName"
            value={videoName}
            onChange={handleInputTextChange}
            className="w-full p-4 border-2 border-black rounded-lg text-lg resize-vertical"
            placeholder="Nombre del video"
            aria-label="Nombre del video"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button type="submit" className="lancemonos-button">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoSearchKeyphrases;
