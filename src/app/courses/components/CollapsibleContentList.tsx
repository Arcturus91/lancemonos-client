"use client";
import { useResponsiveLayout } from "@/app/hooks/useResposiveLayout";
import { CourseItem } from "@/app/types";
import { useState, useCallback } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type ContentListProps = {
  handleSelectItem: (selectedItem: CourseItem) => void;
  allContentData: CourseItem[];
};

// Helper function to build tree structure
const buildTreeStructure = (items: CourseItem[]) => {
  const itemMap = new Map<string, CourseItem & { children?: CourseItem[] }>();
  const rootItems: (CourseItem & { children?: CourseItem[] })[] = [];

  // First pass: Create all items with potential children array
  items.forEach((item) => {
    itemMap.set(item.contentId, { ...item, children: [] });
  });

  // Second pass: Build tree structure
  items.forEach((item) => {
    const treeItem = itemMap.get(item.contentId)!;
    if (item.parentId === null) {
      rootItems.push(treeItem);
    } else {
      const parent = itemMap.get(item.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(treeItem);
      }
    }
  });

  // Sort root items and children by orderIndex
  rootItems.sort((a, b) => a.orderIndex - b.orderIndex);
  rootItems.forEach((item) => {
    if (item.children) {
      item.children.sort((a, b) => a.orderIndex - b.orderIndex);
    }
  });

  return rootItems;
};

const CollapsibleContentList: React.FC<ContentListProps> = ({
  handleSelectItem,
  allContentData,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { isSmallScreen, isExpanded, toggleExpand } = useResponsiveLayout();

  const treeStructure = buildTreeStructure(allContentData);

  const toggleSection = useCallback((contentId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [contentId]: !prev[contentId],
    }));
  }, []);

  const onSelectItem = useCallback(
    (item: CourseItem) => {
      if (item.type === "video") {
        handleSelectItem(item);
        if (isSmallScreen) {
          toggleExpand();
        }
      }
    },
    [handleSelectItem, isSmallScreen, toggleExpand]
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
      {treeStructure.map((section) => (
        <Section
          key={section.contentId}
          item={section}
          isOpen={openSections[section.contentId]}
          toggleSection={toggleSection}
          selectItem={onSelectItem}
          level={0}
        />
      ))}
    </div>
  );
};

type SectionProps = {
  item: CourseItem & { children?: CourseItem[] };
  isOpen: boolean;
  toggleSection: (contentId: string) => void;
  selectItem: (item: CourseItem) => void;
  level: number;
};

const Section: React.FC<SectionProps> = ({
  item,
  isOpen,
  toggleSection,
  selectItem,
  level,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = `${level * 1}rem`;

  return (
    <div className="py-2" style={{ paddingLeft }}>
      <div
        className={`flex justify-between items-center w-full py-2 text-left text-lg font-medium 
          ${
            item.type === "video"
              ? "cursor-pointer hover:text-blue-600"
              : "text-gray-700 hover:text-gray-900"
          }`}
        onClick={() => {
          if (hasChildren) {
            toggleSection(item.contentId);
          }
          selectItem(item);
        }}
      >
        <span>{item.title}</span>
        {hasChildren && (
          <span>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </span>
        )}
      </div>
      {isOpen && hasChildren && (
        <div className="ml-4">
          {item.children?.map((child) => (
            <Section
              key={child.contentId}
              item={child}
              isOpen={false}
              toggleSection={toggleSection}
              selectItem={selectItem}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleContentList;
