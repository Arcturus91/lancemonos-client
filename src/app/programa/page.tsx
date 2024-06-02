"use client";

import React, { useState } from "react";

import VideoPlayer from "./components/VideoPlayer";
import ContentList from "./components/ContentList";
import { introContent, introVideoUrls } from "./content/lanzate/intro-content";

const LanzateProgramPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(introContent[0]);

  return (
    <div className="container-programa">
      <div className="sidebar">
        <ContentList items={introContent} onSelectItem={setSelectedItem} />
      </div>
      <div className="main-content">
        <VideoPlayer videoUrl={introVideoUrls[selectedItem]} />
      </div>
    </div>
  );
};

export default LanzateProgramPage;
