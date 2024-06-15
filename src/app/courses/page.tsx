"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import VideoPlayer from "./components/VideoPlayer";
import {
  introContent,
  present24hrsHTML,
} from "./content/lanzate/intro-content";
import TextContent from "./components/TextContent";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { allVideoUrls, contentList } from "./content/lanzate/ContentList";

const LanzateProgramPage: React.FC = () => {
  const [contentType, setContentType] = useState("video");
  const [selectedItem, setSelectedItem] = useState(introContent[0]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    console.log("selected from page", item);
    router.push(`courses/?item=${item}`);
    if (item.includes("(T)")) {
      setContentType("text");
    } else {
      setContentType("video");
    }
  };

  useEffect(() => {
    const item = searchParams.get("item");
    if (item && typeof item === "string") {
      setSelectedItem(item);
    }
  }, [pathname, searchParams]);

  return (
    <div className="container-programa flex">
      <div className="sidebar">
        <CollapsibleContentList
          contentList={contentList}
          handleSelectItem={handleSelectItem}
        />
      </div>
      <div className="main-content ml-4">
        {contentType === "video" ? (
          <VideoPlayer videoUrl={allVideoUrls[selectedItem]} />
        ) : (
          <TextContent htmlContent={present24hrsHTML} />
        )}
      </div>
    </div>
  );
};

export default LanzateProgramPage;
