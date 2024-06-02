import React from "react";

type ContentListProps = {
  items: string[];
  onSelectItem: (item: string) => void;
};

const ContentList: React.FC<ContentListProps> = ({ items, onSelectItem }) => {
  return (
    <div className="content-list">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              console.log("item selected", item);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;
