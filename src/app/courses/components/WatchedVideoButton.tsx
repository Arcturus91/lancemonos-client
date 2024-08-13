"use client";
import { useUser } from "@/app/contexts/UserContext";
import { UserData } from "@/app/types";
import { useEffect, useState } from "react";

interface WatchedVideoProps {
  videoKey: string;
}

const WatchedVideoButton: React.FC<WatchedVideoProps> = ({ videoKey }) => {
  const { userData, setUserData } = useUser();
  console.log("userdata in watched video button", userData);
  const [statusStringButton, setstatusStringButton] =
    useState("Completar lección");
  const videosAlreadyWatched = userData?.videosWatched ?? [];

  useEffect(() => {
    console.log("useEffect loadded", videoKey);
    if (videosAlreadyWatched.find((item) => item === videoKey)) {
      setstatusStringButton("Completado🔥");
    } else {
      setstatusStringButton("Completar lección");
    }
  }, [videoKey, videosAlreadyWatched]);

  const registerWatchedVideo = async () => {
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
      videosAlreadyWatched.push(videoKey);
      const videosWatched = videosAlreadyWatched;
      setUserData({ ...userData, videosWatched } as UserData);
      setstatusStringButton("Completado🔥");
    }
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
