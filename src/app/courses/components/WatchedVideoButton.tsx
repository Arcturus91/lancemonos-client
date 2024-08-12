"use client";
import { useState } from "react";

interface WatchedVideoProps {
  videoKey: string;
}

const WatchedVideoButton: React.FC<WatchedVideoProps> = ({ videoKey }) => {
  const [statusStringButton, setstatusStringButton] =
    useState("Completar lección");
  const registerWatchedVideo = async () => {
    console.log("button pressed", videoKey);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register-video-watch`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ videoKey }),
      }
    );

    const registerVideoResponse = await response.json();
    if (
      registerVideoResponse["$metadata"] &&
      registerVideoResponse["$metadata"]["httpStatusCode"] === 200
    ) {
      setstatusStringButton("Completado🔥");
    }
    console.log("register video response-->", registerVideoResponse);
  };
  return (
    <>
      <button
        onClick={() => registerWatchedVideo()}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
      >
        {statusStringButton}
      </button>
    </>
  );
};

export default WatchedVideoButton;
