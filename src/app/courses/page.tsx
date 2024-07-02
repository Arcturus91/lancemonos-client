"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import VideoPlayer from "./components/VideoPlayer";
import { present24hrsHTML } from "./content/lanzate/intro-content";
import TextContent from "./components/TextContent";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { allVideoUrls, contentList } from "./content/lanzate/ContentList";
import useAuthVerification from "../hooks/useAuthVerification";

function FallBack() {
  return <h2 className="text-red-500">Cargando...</h2>;
}

const LanzateProgramPage: React.FC = () => {
  const isVerified = useAuthVerification(); // Use the custom hook
  const [contentType, setContentType] = useState("video");
  const [selectedItem, setSelectedItem] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    router.push(`courses/?item=${item}`);
    if (item.includes("text")) {
      setContentType("text");
    } else {
      setContentType("video");
    }
  };

  useEffect(() => {
    const item = searchParams.get("item");
    if (item && typeof item === "string") {
      setSelectedItem(item);
    } else if (!item) {
      setSelectedItem("");
    }
  }, [pathname, searchParams]);

  if (isVerified === null) {
    // Render a loading state while verification is in progress
    return <div>Authenticating...</div>;
  }

  return (
    <>
      <Suspense fallback={<FallBack />}>
        <div className="container-programa flex">
          <div className="sidebar">
            <CollapsibleContentList
              contentList={contentList}
              handleSelectItem={handleSelectItem}
            />
          </div>
          <div className="main-content ml-4">
            {selectedItem &&
              (contentType === "video" ? (
                <VideoPlayer videoUrl={allVideoUrls[selectedItem]} />
              ) : (
                <TextContent htmlContent={present24hrsHTML} />
              ))}
            {!selectedItem && (
              <h1 className="text-center">Bienvenido al programa</h1>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default LanzateProgramPage;
