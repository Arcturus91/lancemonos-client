"use Client";
import { VideoContent } from "@/app/types";
import { useState } from "react";

type ContentListProps = {
  handleSelectItem: (selectedVideoData: VideoContent) => void;
  allContentData: VideoContent[];
};

const contentDataFilter = (
  allVideoContent: VideoContent[],
  section: string
) => {
  return allVideoContent
    .filter((item: VideoContent) => item.videoSection === section)
    .sort((a: VideoContent, b: VideoContent) => {
      return parseInt(a.sectionOrder) - parseInt(b.sectionOrder);
    })
    .map((item: VideoContent) => {
      return item.videoName;
    });
};

const CollapsibleContentList: React.FC<ContentListProps> = ({
  handleSelectItem,
  allContentData,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const contentList: { [key: string]: string[] } = {
    "1. Introducción": contentDataFilter(allContentData, "Introducción"),
    "2. El Marco": contentDataFilter(allContentData, "Marco"),
    "3. Sistema N.O.M.A.S.": contentDataFilter(
      allContentData,
      "Sistema N.O.M.A.S."
    ),
    "4. Círculos Sociales": contentDataFilter(
      allContentData,
      "Círculos Sociales"
    ),
    "5. Citas": contentDataFilter(allContentData, "Citas"),
    "6. Chats y Apps de Citas": contentDataFilter(
      allContentData,
      "Chats y Apps de Citas"
    ),
    "7. Relaciones": contentDataFilter(allContentData, "Relaciones"),
    "8. Sesiones de Análisis de Interacciones": contentDataFilter(
      allContentData,
      "Análisis de Interacciones"
    ),
    "9. Sesiones de Juegos de Roles": contentDataFilter(
      allContentData,
      "Juego de Roles"
    ),
    "10. Sesiones de Mentalidad": contentDataFilter(
      allContentData,
      "Mentalidad"
    ),
  };

  const toggleSection = (key: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const selectVideo = (videoName: string) => {
    const contentItem = allContentData.find(
      (item: VideoContent) => item.videoName === videoName
    ) as VideoContent;
    console.log("content item", contentItem);
    handleSelectItem(contentItem);
  };

  return (
    <div className="cursor-pointer bg-gray-200 p-2 rounded-md">
      {Object.keys(contentList).map((category) => (
        <div key={category} className="text-lg font-bold py-3">
          <button
            className="flex justify-between items-center w-full py-2 text-left text-lg font-medium text-gray-700 hover:text-gray-900"
            onClick={() => toggleSection(category)}
          >
            {category} {openSections[category] ? "-" : "+"}
          </button>
          {openSections[category] && (
            <ul className="pl-4 mt-2 space-y-1">
              {contentList[category].map((item, index) => (
                <li
                  className="text-sm ms-2 py-1"
                  key={index}
                  onClick={() => selectVideo(item)}
                >
                  {item}{" "}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollapsibleContentList;
