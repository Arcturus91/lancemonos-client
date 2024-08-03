"use Client";
import { VideoContent } from "@/app/types";
import { useState } from "react";

type ContentListProps = {
  handleSelectItem: (selectedVideoData: VideoContent) => void;
  allContentData: VideoContent[];
};

const CollapsibleContentList: React.FC<ContentListProps> = ({
  handleSelectItem,
  allContentData,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const contentList: { [key: string]: string[] } = {
    "1. Introducción": allContentData
      .filter((item: VideoContent) => item.videoSection === "Introducción")
      .sort((a: VideoContent, b: VideoContent) => {
        return parseInt(a.sectionOrder) - parseInt(b.sectionOrder);
      })
      .map((item: VideoContent) => {
        return item.videoName;
      }),
    "2. El Marco": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "El Marco") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "3. Sistema N.O.M.A.S.": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Sistema N.O.M.A.S.") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "4. Círculos Sociales": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Círculos Sociales") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "5. Citas": allContentData
      .filter((item: VideoContent) => item.videoSection === "Citas")
      .sort((a: VideoContent, b: VideoContent) => {
        return parseInt(a.sectionOrder) - parseInt(b.sectionOrder);
      })
      .map((item: VideoContent) => {
        return item.videoName;
      }),
    "6. Chats y Apps de Citas": allContentData
      .filter(
        (item: VideoContent) => item.videoSection === "Chats y Apps de Citas"
      )
      .sort((a: VideoContent, b: VideoContent) => {
        return parseInt(a.sectionOrder) - parseInt(b.sectionOrder);
      })
      .map((item: VideoContent) => {
        return item.videoName;
      }),
    "7. Relaciones": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Relaciones") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "8. Sesiones de Análisis de Interacciones": allContentData.map(
      (item: VideoContent) => {
        if (item.videoSection === "Sesiones AI") {
          return item.videoName;
        } else {
          return "";
        }
      }
    ),
    "9. Sesiones de Juegos de Roles": allContentData.map(
      (item: VideoContent) => {
        if (item.videoSection === "Sesiones JR") {
          return item.videoName;
        } else {
          return "";
        }
      }
    ),
    "10. Sesiones de Mentalidad": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Sesiones Mentalidad") {
        return item.videoName;
      } else {
        return "";
      }
    }),
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
