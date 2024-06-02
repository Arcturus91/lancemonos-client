"use client";

import React, { useState } from "react";

import VideoPlayer from "./components/VideoPlayer";
import ContentList from "./components/ContentList";
import {
  introContent,
  introVideoUrls,
  present24hrsHTML,
} from "./content/lanzate/intro-content";
import TextContent from "./components/TextContent";

const LanzateProgramPage: React.FC = () => {
  const [contentType, setContentType] = useState("video");
  const [selectedItem, setSelectedItem] = useState(introContent[0]);

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    if (item.includes("(T)")) {
      setContentType("text");
    } else {
      setContentType("video");
    }
  };

  return (
    <div className="container-programa flex">
      <div className="sidebar w-1/4">
        <ContentList items={introContent} onSelectItem={handleSelectItem} />
      </div>
      <div className="main-content w-3/4 ml-4">
        {contentType === "video" ? (
          <VideoPlayer videoUrl={introVideoUrls[selectedItem]} />
        ) : (
          <TextContent htmlContent={present24hrsHTML} />
        )}
      </div>
    </div>
  );
};

export default LanzateProgramPage;
