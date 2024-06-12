"use client";

import React, { useState } from "react";

import VideoPlayer from "./components/VideoPlayer";
import {
  introContent,
  introVideoUrls,
  present24hrsHTML,
} from "./content/lanzate/intro-content";
import TextContent from "./components/TextContent";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { contentList } from "./content/lanzate/ContentList";

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
      <div className="sidebar">
        <CollapsibleContentList contentList={contentList} />
      </div>
      <div className="main-content ml-4">
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
