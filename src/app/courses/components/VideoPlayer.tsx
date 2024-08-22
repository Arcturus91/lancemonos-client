import { VideoContent } from "@/app/types";
import React from "react";

const VideoPlayer: React.FC<any> = ({ videoData }) => {
  const { videoUrl, videoName } = videoData;
  return (
    <div className="mt-4 flex flex-col items-center justify-center px-4 py-8 m-4 bg-gray-100 h-full relative z-0">
      {/* Title */}
      <h1 className="mb-4 text-2xl sm:text-3xl font-bold text-gray-800 text-center">
        {videoName}
      </h1>

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
