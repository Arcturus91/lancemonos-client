"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VideoPlayer from "./components/VideoPlayer";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { useAuthContext } from "../contexts/AuthContext";
import { VideoContent } from "../types";
import WelcomeContent from "./htmlContent/WelcomeContent";
import WatchedVideoButton from "./components/WatchedVideoButton";

const PdfViewer = React.lazy(() => import("./components/PdfViewer"));

const FallBack: React.FC = () => <h2 className="text-red-500">Cargando...</h2>;

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

  const fetchAllContent = useCallback(async () => {
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
        { method: "GET" }
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      localStorage.setItem("courseContent", JSON.stringify(data));
      setAllContentData(data);
    } catch (error) {
      console.error("Error fetching course content:", error);
      setError("Failed to fetch course content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllContent();
  }, [fetchAllContent]);

  useEffect(() => {
    const fetchAllContent = async () => {
      setIsLoading(true);
      try {
        const cachedData = localStorage.getItem("courseContent");
        if (cachedData) {
          setAllContentData(JSON.parse(cachedData));
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-course-content`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Network response was not ok");

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

    fetchAllContent();
  }, []);

  const handleSelectItem = useCallback(
    (selectedVideoData: VideoContent) => {
      const { videoUrl, videoKey, videoName } = selectedVideoData;
      setSelectedItem({ videoUrl, videoName, videoKey });
      router.push(`courses/?item=${videoKey}`);
      setContentType(videoUrl.includes("pdf") ? "text" : "video");
    },
    [router]
  );

  const renderContent = useMemo(() => {
    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
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
      <>
        <WatchedVideoButton videoKey={selectedItem.videoKey as string} />
        {contentType === "video" ? (
          <VideoPlayer videoData={selectedItem} />
        ) : (
          <React.Suspense fallback={<div>Loading PDF...</div>}>
            <PdfViewer pdfData={selectedItem} />
          </React.Suspense>
        )}
      </>
    );
  }, [isLoading, error, allContentData, selectedItem, contentType]);

  return (
    <React.Suspense fallback={<FallBack />}>
      <div className="container-programa flex">
        <div className="sidebar">
          {isLoading ? (
            <div>Loading sidebar content...</div>
          ) : allContentData ? (
            <CollapsibleContentList
              handleSelectItem={handleSelectItem}
              allContentData={allContentData}
            />
          ) : (
            <div>No content available</div>
          )}
        </div>
        <div className="main-content ml-4">
          {isLoading ? <div>Loading main content...</div> : renderContent}
        </div>
      </div>
    </React.Suspense>
  );
};

export default LanzateProgramPage;
