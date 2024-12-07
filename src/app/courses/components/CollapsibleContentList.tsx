"use client";
import { useResponsiveLayout } from "@/app/hooks/useResposiveLayout";
import { CourseItem } from "@/app/types";
import { useState, useCallback, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type ContentListProps = {
  handleSelectItem: (selectedItem: CourseItem) => void;
  allContentData: CourseItem[];
};

type TreeItem = CourseItem & {
  children?: TreeItem[];
};

// Helper function to build tree structure with recursive sorting
const buildTreeStructure = (items: CourseItem[]): TreeItem[] => {
  const itemMap = new Map<string, TreeItem>();
  const rootItems: TreeItem[] = [];

  // First pass: Create all items
  items.forEach((item) => {
    itemMap.set(item.contentId, { ...item });
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

  // Recursive sorting function
  const sortTreeItems = (items: TreeItem[]) => {
    items.sort((a, b) => {
      // Convert string orderIndex to number if necessary
      const aIndex =
        typeof a.orderIndex === "string"
          ? parseInt(a.orderIndex)
          : a.orderIndex;
      const bIndex =
        typeof b.orderIndex === "string"
          ? parseInt(b.orderIndex)
          : b.orderIndex;
      return aIndex - bIndex;
    });

    items.forEach((item) => {
      if (item.children?.length) {
        sortTreeItems(item.children);
      }
    });

    return items;
  };

  return sortTreeItems(rootItems);
};

const CollapsibleContentList: React.FC<ContentListProps> = ({
  handleSelectItem,
  allContentData,
}) => {
  // Using a more complex state structure to track nested open states
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const { isSmallScreen, isExpanded, toggleExpand } = useResponsiveLayout();

  const treeStructure = buildTreeStructure(allContentData);

  const toggleSection = useCallback(
    (contentId: string, parentIds: string[]) => {
      setOpenSections((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(contentId)) {
          // Close this section and all its children
          newSet.delete(contentId);
          allContentData.forEach((item) => {
            if (item.parentId === contentId) {
              newSet.delete(item.contentId);
            }
          });
        } else {
          // Open this section and all its parent sections
          newSet.add(contentId);
          parentIds.forEach((id) => newSet.add(id));
        }
        return newSet;
      });
    },
    [allContentData]
  );

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

  // Mobile view controls
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
          isOpen={openSections.has(section.contentId)}
          toggleSection={toggleSection}
          selectItem={onSelectItem}
          level={0}
          parentIds={[]}
          openSections={openSections}
        />
      ))}
    </div>
  );
};

type SectionProps = {
  item: TreeItem;
  isOpen: boolean;
  toggleSection: (contentId: string, parentIds: string[]) => void;
  selectItem: (item: CourseItem) => void;
  level: number;
  parentIds: string[];
  openSections: Set<string>;
};

const Section: React.FC<SectionProps> = ({
  item,
  isOpen,
  toggleSection,
  selectItem,
  level,
  parentIds,
  openSections,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = `${level * 1}rem`;
  const currentPath = [...parentIds, item.contentId];

  // Determine if this section should be visible based on parent states
  const isVisible =
    level === 0 || parentIds.every((id) => openSections.has(id));

  if (!isVisible) return null;

  return (
    <div className="py-2" style={{ paddingLeft }}>
      <div
        className={`flex justify-between items-center w-full py-2 text-left text-lg font-medium 
          ${
            item.type === "video"
              ? "cursor-pointer hover:text-blue-600"
              : "text-gray-700 hover:text-gray-900 cursor-pointer"
          }`}
        onClick={() => {
          if (hasChildren) {
            toggleSection(item.contentId, parentIds);
          }
          selectItem(item);
        }}
      >
        <div className="flex items-center justify-between w-full">
          <span className={`${item.type === "video" ? "text-base" : ""}`}>
            {!item.parentId ? `${item.orderIndex}. ${item.title}` : item.title}
          </span>
          {hasChildren && (
            <span className="text-gray-500">
              {isOpen ? (
                <KeyboardArrowUpIcon className="h-5 w-5" />
              ) : (
                <KeyboardArrowDownIcon className="h-5 w-5" />
              )}
            </span>
          )}
        </div>
      </div>
      {hasChildren && (
        <div
          className={`ml-3 transition-all duration-200 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {item.children?.map((child) => (
            <Section
              key={child.contentId}
              item={child}
              isOpen={openSections.has(child.contentId)}
              toggleSection={toggleSection}
              selectItem={selectItem}
              level={level + 1}
              parentIds={currentPath}
              openSections={openSections}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleContentList;
