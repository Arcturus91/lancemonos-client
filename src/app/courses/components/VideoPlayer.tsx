import { VideoContent } from "@/app/types";
import React from "react";
import WatchedVideoButton from "./WatchedVideoButton";

const VideoPlayer: React.FC<any> = ({ videoData }) => {
  const { videoUrl, videoName, videoKey } = videoData;
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 bg-gray-100 h-full w-full">
      <div className="flex justify-between items-center w-full max-w-4xl mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {videoName}
        </h1>
        <WatchedVideoButton videoKey={videoKey} />
      </div>

      {/* Video */}
      <div className="w-full max-w-2xl mb-6 bg-white shadow-md aspect-video">
        <video className="w-full h-full" controls muted loop key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
