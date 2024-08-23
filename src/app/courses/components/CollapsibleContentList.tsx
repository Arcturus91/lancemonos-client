"use client";
import { useResponsiveLayout } from "@/app/hooks/useResposiveLayout";
import { VideoContent } from "@/app/types";
import { useState, useCallback, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
  const { isSmallScreen, isExpanded, toggleExpand } = useResponsiveLayout();

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
        if (isSmallScreen) {
          toggleExpand();
        }
      } else {
        console.error(`Video content not found for: ${videoName}`);
      }
    },
    [allContentData, handleSelectItem, isSmallScreen, toggleExpand]
  );

  if (isSmallScreen && !isExpanded) {
    return (
      <button
        onClick={toggleExpand}
        className="fixed bottom-10 right-4 bg-gray-600 text-white p-2 rounded-full shadow-lg z-50"
      >
        Show Content
      </button>
    );
  }

  return (
    <div className="collapsible-content-list bg-gray-200 p-4">
      {isSmallScreen && isExpanded && (
        <button
          onClick={toggleExpand}
          className="fixed bottom-10 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50"
        >
          Close
        </button>
      )}
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
  <div className="text-lg  py-3">
    <button
      className="flex justify-between items-center w-full py-2 text-left text-lg font-medium text-gray-700 hover:text-gray-900"
      onClick={() => toggleSection(category)}
    >
      {category} {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </button>
    {isOpen && (
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => selectVideo(item)}>
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CollapsibleContentList;
