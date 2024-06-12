import React, { useState } from "react";

type ContentListProps = {
  titleList: string[];
  //onSelectItem: (item: string) => void;
};

const ContentList: React.FC<ContentListProps> = (
  /* { items, onSelectItem } */ { titleList }
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="content-list">
      <div
        className="cursor-pointer bg-gray-200 p-2 rounded-md"
        onClick={toggleDropdown}
      >
        <ul className="mt-2">
          {titleList.map((item, index) => (
            <li
              key={index}
              className="text-lg font-bold py-3"
              onClick={() => {
                console.log("item selected", item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentList;

/* {isOpen && (
        <ul className="mt-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-300 rounded-md"
              onClick={() => {
                console.log("item selected", item);
                onSelectItem(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )} */
