import React from "react";

type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  console.log("url video sent", videoUrl);
  return (
    <div className="video-player flex justify-center">
      <video
        key={videoUrl}
        className="w-full max-w-2xl h-auto"
        controls
        loop
        muted
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
