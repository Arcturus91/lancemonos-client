"use client";
import { useUser } from "@/app/contexts/UserContext";
import { UserData } from "@/app/types";
import { useEffect, useState, useCallback, useMemo } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorIcon from "@mui/icons-material/Error";
import Tooltip from "@mui/material/Tooltip";
import { Fade } from "@mui/material";

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
        return <CheckCircleOutlineIcon color="action" fontSize="large" />;
      case "loading":
        return <HourglassBottomIcon color="disabled" fontSize="large" />;
      case "error":
        return <ErrorIcon color="warning" fontSize="large" />;
      case "completed":
        return <CheckCircleIcon color="success" fontSize="large" />;
    }
  }, [buttonStatus]);

  const buttonTooltip = useMemo(() => {
    switch (buttonStatus) {
      case "idle":
        return "Marcar como completado";
      case "completed":
        return "Marcar como incompleto";
      default:
        return "";
    }
  }, [buttonStatus]);

  return (
    <Tooltip
      title={buttonTooltip}
      placement="left"
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      sx={{
        "& .MuiTooltip-tooltip": {
          fontSize: "20px",
        },
      }}
    >
      <button
        onClick={selectWatchVideoAction}
        disabled={!userData || buttonStatus === "loading"}
        className="p-2 rounded-full hover:bg-gray-300 transition-colors"
      >
        {buttonText}
      </button>
    </Tooltip>
  );
};

export default WatchedVideoButton;
