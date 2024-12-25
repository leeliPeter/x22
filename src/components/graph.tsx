"use client";

import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { communities, nodes, Node as DataNode } from "@/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

// Define types for our graph data
type GraphNode = {
  id: string;
  name: string;
  val: number;
  color?: string;
  x?: number;
  y?: number;
  z?: number;
  isCommunity?: boolean;
  communityId?: number;
};

type Link = {
  source: string;
  target: string;
  value?: number;
};

type GraphData = {
  nodes: GraphNode[];
  links: Link[];
};

// NodeDetail component
const NodeDetail = ({ node }: { node: DataNode | null }) => {
  if (!node) return null;

  return (
    <Card className="w-80 absolute right-4 top-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <CardTitle>{node.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <div className="font-semibold">Type:</div>
          <div>{node.type}</div>
        </div>
        <div>
          <div className="font-semibold">Description:</div>
          <div>{node.description}</div>
        </div>
        <div>
          <div className="font-semibold">Community:</div>
          <div>{node.community}</div>
        </div>
        <div>
          <div className="font-semibold">Degree:</div>
          <div>{node.degree}</div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate random connections between nodes
const generateRandomLinks = (nodes: GraphNode[]) => {
  const links: Link[] = [];
  nodes.forEach((node, i) => {
    // Create 1-3 random connections for each node
    const numConnections = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numConnections; j++) {
      const targetIndex = Math.floor(Math.random() * nodes.length);
      if (targetIndex !== i) {
        links.push({
          source: node.id,
          target: nodes[targetIndex].id,
        });
      }
    }
  });
  return links;
};

// Colors for different communities
const communityColors = {
  2: "#1f77b4",
  4: "#ff7f0e",
  5: "#2ca02c",
  6: "#d62728",
  18: "#9467bd",
  21: "#8c564b",
};

export default function Graph() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(
    null
  );
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 800,
  });

  // Generate initial graph data with communities
  const [graphData, setGraphData] = useState<GraphData>(() => {
    const communityNodes: GraphNode[] = communities.map((community) => ({
      id: `community-${community.id}`,
      name: community.title,
      val: community.size * 3, // Size based on community size
      color: communityColors[community.id as keyof typeof communityColors],
      isCommunity: true,
    }));

    return {
      nodes: communityNodes,
      links: generateRandomLinks(communityNodes),
    };
  });

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 800,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Update handle node click
  const handleNodeClick = useCallback((node: GraphNode) => {
    if (node.isCommunity) {
      const communityId = parseInt(node.id.split("-")[1]);

      // Get nodes for this community
      const communityNodes = nodes
        .filter((n) => n.community === communityId)
        .map((n) => ({
          id: n.id,
          name: n.title,
          val: n.degree,
          color: communityColors[communityId as keyof typeof communityColors],
          communityId: communityId,
        }));

      setSelectedCommunity(communityId);
      setSelectedNode(null);
      setGraphData({
        nodes: communityNodes,
        links: generateRandomLinks(communityNodes),
      });
    } else {
      // Find and set the selected node from our data
      const nodeData = nodes.find((n) => n.id === node.id);
      if (nodeData) {
        setSelectedNode(nodeData);
      }
    }
  }, []);

  // Update handle back to communities
  const handleBackToCommunities = useCallback(() => {
    setSelectedCommunity(null);
    setSelectedNode(null);
    const communityNodes = communities.map((community) => ({
      id: `community-${community.id}`,
      name: community.title,
      val: community.size * 3,
      color: communityColors[community.id as keyof typeof communityColors],
      isCommunity: true,
    }));

    setGraphData({
      nodes: communityNodes,
      links: generateRandomLinks(communityNodes),
    });
  }, []);

  return (
    <div className="relative">
      {selectedCommunity && (
        <button
          onClick={handleBackToCommunities}
          className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Back to Communities
        </button>
      )}
      <NodeDetail node={selectedNode} />
      <div
        ref={containerRef}
        className="w-full h-[calc(100vh-100px)] border rounded-lg bg-background overflow-hidden"
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel="name"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          nodeColor={(node: any) => (node as GraphNode).color ?? "#cccccc"}
          nodeRelSize={2}
          linkWidth={1.5}
          minZoom={1}
          maxZoom={3}
          linkColor={() => "#cccccc"}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onNodeClick={(node: any) => handleNodeClick(node as GraphNode)}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
}
