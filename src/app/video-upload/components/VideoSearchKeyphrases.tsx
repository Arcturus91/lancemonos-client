import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const VideoSearchKeyphrases = () => {
  const [videoName, setVideoName] = useState<string>(
    "cosas-esenciales-primera-cita"
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/video-upload/video-keyphrases/?video-name=${videoName}`);
  };

  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoName(e.target.value);
  };

  return (
    <div className="search-video-keyphrase">
      <h1>Modifica las palabras clave</h1>
      <h2>Tipea el nombre exacto con el que subiste el video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          id="text"
          type="text"
          value={videoName}
          onChange={handleInputTextChange}
          className="mb-4 p-4 border border-black rounded text-lg w-full max-w-lg"
        />
        <button
          type="submit"
          className="rounded-full bg-black text-white py-2 px-4 transition ease-in-out duration-100 hover:bg-white hover:text-black hover:outline hover:outline-black"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default VideoSearchKeyphrases;
