"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import VideoPlayer from "./components/VideoPlayer";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { useAuthContext } from "../contexts/AuthContext";
import { VideoContent } from "../types";
import WelcomeContent from "./htmlContent/WelcomeContent";
import WatchedVideoButton from "./components/WatchedVideoButton";
import Spinner from "../components/LoadingSpinner";
const PdfViewer = React.lazy(() => import("./components/PdfViewer"));

const FallBack: React.FC = () => <Spinner size="large" />;

const LanzateProgramPage: React.FC = () => {
  const [contentType, setContentType] = useState<"video" | "text">("video");
  const [selectedItem, setSelectedItem] =
    useState<Partial<VideoContent> | null>(null);

  const [allContentData, setAllContentData] = useState<VideoContent[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuthContext();

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
      if (!allContentData) return router.push("/courses");
      const { videoUrl, videoName, videoKey } = allContentData?.find(
        (videoItem: VideoContent) => videoItem.videoKey === item
      ) as VideoContent;
      setSelectedItem({ videoUrl, videoName, videoKey });
    } else if (!item) {
      setSelectedItem(null);
    }
  }, [pathname, searchParams, allContentData]);

  const handleSelectItem = (selectedVideoData: VideoContent) => {
    const { videoUrl, videoKey, videoName } = selectedVideoData;
    setSelectedItem({ videoUrl, videoName, videoKey });
    router.push(`courses/?item=${videoKey}`);
    setContentType(videoUrl.includes("pdf") ? "text" : "video");
  };

  const renderContent = useMemo(() => {
    if (isLoading) return <Spinner size="large" />;
    if (error)
      return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!allContentData)
      return (
        <div className="text-center mt-8 text-red-500">
          El contenido no está disponible.
        </div>
      );

    if (!selectedItem) return <WelcomeContent />;

    return (
      <div className="flex flex-col">
        {contentType === "video" ? (
          <VideoPlayer videoData={selectedItem} />
        ) : (
          <React.Suspense
            fallback={
              <div>
                <Spinner size="large" />
              </div>
            }
          >
            <PdfViewer pdfData={selectedItem} />
          </React.Suspense>
        )}
      </div>
    );
  }, [isLoading, error, allContentData, selectedItem, contentType]);

  return (
    <React.Suspense fallback={<FallBack />}>
      <div className="container-programa relative z-0">
        <div className="sidebar">
          {isLoading ? (
            <Spinner size="large" />
          ) : allContentData ? (
            <CollapsibleContentList
              handleSelectItem={handleSelectItem}
              allContentData={allContentData}
            />
          ) : (
            <div>No content available</div>
          )}
        </div>
        <div className="main-content">
          {isLoading ? <Spinner size="large" /> : renderContent}
        </div>
      </div>
    </React.Suspense>
  );
};

export default LanzateProgramPage;
