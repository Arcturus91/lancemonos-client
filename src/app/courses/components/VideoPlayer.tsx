import { VideoContent } from "@/app/types";
import React from "react";

const VideoPlayer: React.FC<any> = ({ videoData }) => {
  const { videoUrl, videoName } = videoData;
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 m-4 bg-gray-100 h-full overflow-y-auto">
      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold text-gray-800">{videoName}</h1>

      {/* Video */}
      <div className="relative w-full max-w-2xl mb-6 bg-white shadow-md aspect-video">
        <video className="w-full h-full" controls muted loop key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
