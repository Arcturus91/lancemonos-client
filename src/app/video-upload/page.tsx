"use client";

import VideoUpload from "./components/VideoUpload";
import VideoSearchKeyphrases from "./components/VideoSearchKeyphrases";

export default function Page() {
  return (
    <div>
      <VideoSearchKeyphrases />
      <VideoUpload />
    </div>
  );
}
