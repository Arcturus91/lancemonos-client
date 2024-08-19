"use client";
import { useEffect, useState } from "react";

const SummaryContent: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/get-video-html"
        );
        const data = await response.json();
        console.log("data in s3 html client", data);
        setHtmlContent(data);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    };

    fetchHtml();
  }, []);

  return (
    <div className="tailwind-wrapper">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default SummaryContent;
