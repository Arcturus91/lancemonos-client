import React from "react";

type TextContentProps = {
  htmlContent: string;
};

const TextContent: React.FC<TextContentProps> = ({ htmlContent }) => {
  return (
    <div
      className="text-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default TextContent;
