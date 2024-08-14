"use client";

import VideoUpload from "./components/VideoUpload";
import VideoSearchKeyphrases from "./components/VideoSearchKeyphrases";
import { useState } from "react";

const VideoUploadPage: React.FC = () => {
  const [videoKey, setvideoKey] = useState("coloca-aquí-el-nombre-del-video");

  const getVideoUploadKey = (videoKey: string) => {
    console.log("getVideoUploadKey", videoKey);
    const videoName = videoKey.split(".")[0];
    setvideoKey(videoName);
    return;
  };

  return (
    <div>
      <VideoSearchKeyphrases videoKey={videoKey} />
      <VideoUpload getVideoUploadKey={getVideoUploadKey} />
    </div>
  );
};

export default VideoUploadPage;
