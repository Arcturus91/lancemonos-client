"use Client";
import useResizeObserver from "@/app/hooks/useResizeObserver";
import { useResponsiveLayout } from "@/app/hooks/useResposiveLayout";
import { VideoContent } from "@/app/types";
import React, { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const resizeObserverOptions = {};
interface PdfViewerProps {
  pdfData: Partial<VideoContent>;
}
const PdfViewer: React.FC<PdfViewerProps> = ({ pdfData }) => {
  const url = pdfData.videoUrl;
  const { videoName } = pdfData;
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isSmallScreen } = useResponsiveLayout();

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const maxWidth = isSmallScreen ? 800 : 1000;
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="PdfViewer__container overflow-y-auto h-full px-4 py-8">
      <h1 className="mb-4 text-2xl sm:text-3xl font-bold text-gray-800 text-center">
        {videoName}
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 w-full max-w-2xl mx-auto">
        <p className="text-center text-sm sm:text-base mb-2 sm:mb-0">
          Page {pageNumber} of {numPages}
        </p>
        <div className="flex space-x-2">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            disabled={numPages !== null && pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      {isLoaded && (
        <div className="PdfViewer__container__document mt-4">
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
              className="flex justify-center p-4"
            />
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
