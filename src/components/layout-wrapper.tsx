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
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
