import React, { useState } from "react";

type ContentListProps = {
  items: string[];
  onSelectItem: (item: string) => void;
};

const ContentList: React.FC<ContentListProps> = ({ items, onSelectItem }) => {
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
        <h2 className="text-lg font-bold py-3">1. Introduction</h2>
        {/*         <h2 className="text-lg font-bold py-3">2. El Marco</h2>
        <h2 className="text-lg font-bold py-3">3. Sitema N.O.M.A.S.</h2>
        <h2 className="text-lg font-bold py-3">4. Sistema Lancémonos</h2>
        <h2 className="text-lg font-bold py-3">5. Círculos Sociales</h2>
        <h2 className="text-lg font-bold py-3">6. Citas</h2>
        <h2 className="text-lg font-bold py-3">7. Chats y Apps de Citas</h2>
        <h2 className="text-lg font-bold py-3">8. Relaciones</h2> */}
      </div>
      {isOpen && (
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
      )}
    </div>
  );
};

export default ContentList;
