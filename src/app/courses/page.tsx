"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import VideoPlayer from "./components/VideoPlayer";
import TextContent from "./components/TextContent";
import CollapsibleContentList from "./components/CollapsibleContentList";
import { useAuthContext } from "../contexts/AuthContext";
import { VideoContent } from "../types";

function FallBack() {
  return <h2 className="text-red-500">Cargando...</h2>;
}

const LanzateProgramPage: React.FC = () => {
  const [contentType, setContentType] = useState("video");
  const [selectedItem, setSelectedItem] = useState("");
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
      const selectedItemUrl = allContentData?.find(
        (videoItem: VideoContent) => videoItem.videoKey === item
      )?.videoUrl as string;
      setSelectedItem(selectedItemUrl);
    } else if (!item) {
      setSelectedItem("");
    }
  }, [pathname, searchParams, allContentData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!allContentData) return <div>No content available</div>;

  const handleSelectItem = (videoKey: string, videoUrl: string) => {
    console.log("videokey", videoKey, videoUrl);
    setSelectedItem(videoUrl);
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
                <VideoPlayer videoUrl={selectedItem} />
              ) : (
                <div>
                  <h1>Working in displaying pdf</h1>
                </div>
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
