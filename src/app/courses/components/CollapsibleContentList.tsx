"use client";
import { VideoContent } from "@/app/types";
import { useState, useCallback } from "react";

type ContentListProps = {
  handleSelectItem: (selectedVideoData: VideoContent) => void;
  allContentData: VideoContent[];
};

const sortContentData = (a: VideoContent, b: VideoContent) =>
  parseInt(a.sectionOrder) - parseInt(b.sectionOrder);

const filterContentData = (
  allVideoContent: VideoContent[],
  section: string
): string[] =>
  allVideoContent
    .filter((item: VideoContent) => item.videoSection === section)
    .sort(sortContentData)
    .map((item: VideoContent) => item.videoName);

const CONTENT_SECTIONS = [
  "1. Introducción",
  "2. El Marco",
  "3. Sistema N.O.M.A.S.",
  "4. Círculos Sociales",
  "5. Citas",
  "6. Chats y Apps de Citas",
  "7. Relaciones",
  "8. Sesiones de Análisis de Interacciones",
  "9. Sesiones de Juegos de Roles",
  "10. Sesiones de Mentalidad",
];

const CollapsibleContentList: React.FC<ContentListProps> = ({
  handleSelectItem,
  allContentData,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const contentList = CONTENT_SECTIONS.reduce((acc, section) => {
    const sectionKey = section.split(". ")[1];
    acc[section] = filterContentData(allContentData, sectionKey);
    return acc;
  }, {} as Record<string, string[]>);

  const toggleSection = useCallback((key: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }, []);

  const selectVideo = useCallback(
    (videoName: string) => {
      const contentItem = allContentData.find(
        (item: VideoContent) => item.videoName === videoName
      );
      if (contentItem) {
        handleSelectItem(contentItem);
      } else {
        console.error(`Video content not found for: ${videoName}`);
      }
    },
    [allContentData, handleSelectItem]
  );

  return (
    <div className="cursor-pointer bg-gray-200 p-2 rounded-md h-full overflow-y-auto pb-16">
      {CONTENT_SECTIONS.map((category) => (
        <Section
          key={category}
          category={category}
          isOpen={openSections[category]}
          toggleSection={toggleSection}
          items={contentList[category]}
          selectVideo={selectVideo}
        />
      ))}
    </div>
  );
};

type SectionProps = {
  category: string;
  isOpen: boolean;
  toggleSection: (key: string) => void;
  items: string[];
  selectVideo: (videoName: string) => void;
};

const Section: React.FC<SectionProps> = ({
  category,
  isOpen,
  toggleSection,
  items,
  selectVideo,
}) => (
  <div className="text-lg font-bold py-3">
    <button
      className="flex justify-between items-center w-full py-2 text-left text-lg font-medium text-gray-700 hover:text-gray-900"
      onClick={() => toggleSection(category)}
    >
      {category} {isOpen ? "-" : "+"}
    </button>
    {isOpen && (
      <ul className="pl-4 mt-2 space-y-1">
        {items.map((item, index) => (
          <li
            className="text-sm ms-2 py-1"
            key={index}
            onClick={() => selectVideo(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CollapsibleContentList;
