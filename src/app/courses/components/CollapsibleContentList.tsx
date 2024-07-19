"use Client";
import { VideoContent } from "@/app/types";
import { useState } from "react";

type ContentListProps = {
  handleSelectItem: (
    selectedVideoKey: string,
    selectedVideoUrl: string
  ) => void;
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
    "1. Introducción": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Introducción") {
        return item.videoName;
      } else {
        return "";
      }
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
    "4. Sistema Lancémonos": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Sistema Lancémonos") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "5. Círculos Sociales": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Círculos Sociales") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "6. Citas": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Citas") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "7. Chats y Apps de Citas": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Chats y Apps de Citas") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "8. Relaciones": allContentData.map((item: VideoContent) => {
      if (item.videoSection === "Relaciones") {
        return item.videoName;
      } else {
        return "";
      }
    }),
    "9. Sesiones de Análisis de Interacciones": allContentData.map(
      (item: VideoContent) => {
        if (item.videoSection === "Sesiones AI") {
          return item.videoName;
        } else {
          return "";
        }
      }
    ),
    "10. Sesiones de Juegos de Roles": allContentData.map(
      (item: VideoContent) => {
        if (item.videoSection === "Sesiones JR") {
          return item.videoName;
        } else {
          return "";
        }
      }
    ),
    "11. Sesiones de Mentalidad": allContentData.map((item: VideoContent) => {
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
    );
    const selectedVideoKey = contentItem?.videoKey as string;
    const selectedVideoUrl = contentItem?.videoUrl as string;
    handleSelectItem(selectedVideoKey, selectedVideoUrl);
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
