"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import VideoPlayer from "./components/VideoPlayer";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { useAuthContext } from "../contexts/AuthContext";
import { VideoContent } from "../types";
import WelcomeContent from "./htmlContent/WelcomeContent";
const PdfViewer = React.lazy(() => import("./components/PdfViewer"));

function FallBack() {
  return <h2 className="text-red-500">Cargando...</h2>;
}

const LanzateProgramPage: React.FC = () => {
  const [contentType, setContentType] = useState("video");
  const [selectedItem, setSelectedItem] =
    useState<Partial<VideoContent> | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuthContext();

  const [allContentData, setAllContentData] = useState<VideoContent[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllContent = async () => {
      try {
        setIsLoading(true);
        const cachedData = localStorage.getItem("courseContent");
        if (cachedData) {
          setAllContentData(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-course-content`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        localStorage.setItem("courseContent", JSON.stringify(data));
        setAllContentData(data);
      } catch (error) {
        console.error("Error fetching course content:", error);
        setError("Failed to fetch course content");
      } finally {
        setIsLoading(false);
      }
    };

    getAllContent();
  }, []);

  useEffect(() => {
    checkAuth();
    const item = searchParams.get("item");
    if (item && typeof item === "string") {
      const { videoUrl, videoName } = allContentData?.find(
        (videoItem: VideoContent) => videoItem.videoKey === item
      ) as VideoContent;
      setSelectedItem({ videoUrl, videoName });
    } else if (!item) {
      setSelectedItem(null);
    }
  }, [pathname, searchParams, allContentData]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }
  if (!allContentData)
    return (
      <div className="text-center mt-8 text-red-500">
        El contenido no está disponible.
      </div>
    );

  const handleSelectItem = (selectedVideoData: VideoContent) => {
    const { videoUrl, videoKey, videoName } = selectedVideoData;
    setSelectedItem({ videoUrl, videoName });
    console.log("selected item", selectedVideoData, selectedItem);
    router.push(`courses/?item=${videoKey}`);
    if (videoUrl.includes("pdf")) {
      setContentType("text");
    } else {
      setContentType("video");
    }
  };

  return (
    <>
      <Suspense fallback={<FallBack />}>
        <div className="container-programa flex">
          <div className="sidebar">
            <CollapsibleContentList
              handleSelectItem={handleSelectItem}
              allContentData={allContentData}
            />
          </div>
          <div className="main-content ml-4">
            {selectedItem &&
              (contentType === "video" ? (
                <VideoPlayer videoData={selectedItem} />
              ) : (
                <Suspense fallback={<div>Loading PDF...</div>}>
                  <PdfViewer pdfData={selectedItem} />
                </Suspense>
              ))}
            {!selectedItem && <WelcomeContent />}
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default LanzateProgramPage;
