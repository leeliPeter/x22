"use client";

import React, { useCallback, useRef } from "react";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

// Define types for our graph data
type Node = {
  id: string;
  name: string;
  val: number;
  color?: string;
  x?: number;
  y?: number;
  z?: number;
};

type Link = {
  source: string;
  target: string;
  value?: number;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

// Helper function to generate tree-like connections
const generateTreeLinks = (nodes: Node[]) => {
  const links: Link[] = [];

  // Each node (except root) connects to a previous node
  for (let i = 1; i < nodes.length; i++) {
    const currentId = (i + 1).toString();
    const parentId = Math.floor(i / 2 + 1).toString(); // Tree-like parent connection
    links.push({
      source: parentId,
      target: currentId,
    });

    // Add some cross connections for complexity (optional)
    if (Math.random() > 0.7) {
      // 30% chance of extra connection
      const randomTarget = Math.floor(Math.random() * i + 1).toString();
      if (randomTarget !== currentId && randomTarget !== parentId) {
        links.push({
          source: currentId,
          target: randomTarget,
        });
      }
    }
  }
  return links;
};

// Sample data with more nodes
const sampleData: GraphData = {
  nodes: [
    { id: "1", name: "Root", val: 30, color: "#1f77b4" },
    { id: "2", name: "User 2", val: 20, color: "#ff7f0e" },
    { id: "3", name: "User 3", val: 20, color: "#2ca02c" },
    { id: "4", name: "User 4", val: 15, color: "#d62728" },
    { id: "5", name: "User 5", val: 15, color: "#9467bd" },
    { id: "6", name: "User 6", val: 15, color: "#8c564b" },
    { id: "7", name: "User 7", val: 15, color: "#e377c2" },
    { id: "8", name: "User 8", val: 12, color: "#7f7f7f" },
    { id: "9", name: "User 9", val: 12, color: "#bcbd22" },
    { id: "10", name: "User 10", val: 12, color: "#17becf" },
  ],
  links: [],
};

// Generate tree connections
sampleData.links = generateTreeLinks(sampleData.nodes);

export default function Graph() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 800,
  });

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          // width changes based on the sidebar width
          width: containerRef.current.offsetWidth,
          height: 800,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Callback to handle node click
  const handleNodeClick = useCallback((node: Node) => {
    const distance = 40;
    const distRatio =
      1 + distance / Math.hypot(node.x ?? 0, node.y ?? 0, node.z ?? 0);

    if (graphRef.current) {
      graphRef.current.centerAt(
        (node.x ?? 0) * distRatio,
        (node.y ?? 0) * distRatio,
        1000
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-100px)] border rounded-lg bg-background overflow-hidden"
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={sampleData}
        nodeLabel="name"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodeColor={(node: any) => (node as Node).color ?? "#cccccc"}
        nodeRelSize={2}
        linkWidth={1.5}
        minZoom={1}
        maxZoom={2}
        linkColor={() => "#cccccc"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onNodeClick={(node: any) => handleNodeClick(node as Node)}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}
