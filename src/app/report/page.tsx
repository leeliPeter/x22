"use client";

import React, { useState, useCallback } from "react";
import ChatBox from "./_components/chat-box";
import Report from "./_components/report";

export default function ReportPage() {
  const [leftWidth, setLeftWidth] = useState(70); // percentage

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.pageX;
      const startWidth = leftWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const containerWidth = window.innerWidth - 200; // Account for sidebar
        const newWidth =
          (((startWidth * containerWidth) / 100 + (e.pageX - startX)) /
            containerWidth) *
          100;
        setLeftWidth(Math.min(Math.max(20, newWidth), 80)); // Limit between 20% and 80%
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [leftWidth]
  );

  return (
    <div className="flex flex-row items-center h-full relative">
      <div className="left-side  h-full" style={{ width: `${leftWidth}%` }}>
        <Report />
      </div>
      <div
        className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize absolute h-full"
        style={{ left: `${leftWidth}%` }}
        onMouseDown={handleMouseDown}
      />
      <div
        className="right-side h-full"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <ChatBox />
      </div>
    </div>
  );
}
