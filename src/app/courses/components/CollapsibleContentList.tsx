"use Client";
import { useState } from "react";

type ContentListProps = {
  contentList: { [key: string]: string[] };
  handleSelectItem: (item: string) => void;
};

const CollapsibleContentList: React.FC<ContentListProps> = ({
  contentList,
  handleSelectItem,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (key: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const selectVideo = (item: string) => {
    console.log("item ckiekc", item);
    handleSelectItem(item);
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
