"use client";
import { useUser } from "@/app/contexts/UserContext";
import { UserData } from "@/app/types";
import { useEffect, useState, useCallback, useMemo } from "react";

interface WatchedVideoProps {
  videoKey: string;
}

const WatchedVideoButton: React.FC<WatchedVideoProps> = ({ videoKey }) => {
  const { userData, setUserData } = useUser();
  const [buttonStatus, setButtonStatus] = useState<
    "idle" | "loading" | "error" | "completed"
  >("idle");

  const videosAlreadyWatched = useMemo(
    () => userData?.videosWatched ?? [],
    [userData?.videosWatched]
  );

  const isVideoWatched = useMemo(
    () => videosAlreadyWatched.includes(videoKey),
    [videosAlreadyWatched, videoKey]
  );

  useEffect(() => {
    setButtonStatus(isVideoWatched ? "completed" : "idle");
  }, [isVideoWatched]);

  const registerWatchedVideo = useCallback(async () => {
    if (!userData) return;

    setButtonStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register-video-watch`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoKey }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register video");
      }

      const registerVideoResponse = await response.json();
      if (registerVideoResponse["$metadata"]?.httpStatusCode === 200) {
        const updatedUserData: UserData = {
          ...userData,
          videosWatched: [...userData.videosWatched, videoKey],
        };
        setUserData(updatedUserData);
        setButtonStatus("completed");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error registering video:", error);
      setButtonStatus("error");
    }
  }, [userData, videoKey, setUserData]);

  const unregisterVideoWatched = useCallback(async () => {
    if (!userData) return;

    setButtonStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-video-watch`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoKey }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register video");
      }

      const unregisterVideoResponse = await response.json();
      if (unregisterVideoResponse["$metadata"]?.httpStatusCode === 200) {
        const updatedUserData: UserData = {
          ...userData,
          videosWatched: userData.videosWatched.filter(
            (item) => item !== videoKey
          ),
        };
        setUserData(updatedUserData);
        setButtonStatus("idle");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error registering video:", error);
      setButtonStatus("error");
    }
  }, [userData, videoKey, setUserData]);

  const selectWatchVideoAction = () => {
    if (buttonStatus === "idle") {
      registerWatchedVideo();
    } else if (buttonStatus === "completed") {
      unregisterVideoWatched();
    }
  };
  const buttonText = useMemo(() => {
    switch (buttonStatus) {
      case "idle":
        return "Completar lección";
      case "loading":
        return "Loading...";
      case "error":
        return "Error - Intentar de nuevo";
      case "completed":
        return "Completado🔥";
    }
  }, [buttonStatus]);

  return (
    <button
      onClick={() => {
        selectWatchVideoAction();
      }}
      disabled={!userData || buttonStatus === "loading"}
      className={`px-4 py-2 text-sm font-medium text-white rounded ${
        buttonStatus === "completed"
          ? "bg-green-500"
          : buttonStatus === "error"
          ? "bg-red-500"
          : buttonStatus === "loading"
          ? "bg-gray-400"
          : "bg-blue-500"
      }`}
    >
      {buttonText}
    </button>
  );
};

export default WatchedVideoButton;
