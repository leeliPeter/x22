"use client";

import { useState } from "react";
import Sidebar from "./sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex h-screen">
      {/* sidebar wrap the main content */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 w-full overflow-x-hidden ">{children}</main>
    </div>
  );
}
