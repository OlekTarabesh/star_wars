import { Position } from "@xyflow/react";
import { Character } from "../api";

export const arrangeNodesInGraph = (
  nodes: Character[],
  centerX: number,
  centerY: number,
  xOffset: number,
  yOffset: number
) => {
  return nodes.map((node, index) => {
    if (index === 0) {
      // Position the main character node on the left
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "input",
        data: { label: node.name || node.title },
        position: {
          x: centerX - xOffset, // Shift to the left
          y: centerY,
        },
        style: {
          padding: 8,
          width: 90,
          backgroundColor: "#5f6Ff0",
          border: "none",
          fontWeight: 600,
          color: "#fff",
        },
        sourcePosition: Position.Right,
      };
    } else if (node.filmNode) {
      // Position film nodes to the right of the character node
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        position: {
          x: centerX, // Place films directly to the right of the character
          y: centerY + index * yOffset - (yOffset * nodes.length) / 2, // Stagger vertically based on index
        },
        style: {
          width: 80,
          backgroundColor: "#FF9fff",
          border: "none",
          padding: 10,
          fontSize: 8,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    } else if (node.starshipNode) {
      // Position starship nodes further to the right of the film nodes
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        position: {
          x: centerX + xOffset, // Shift further right from the films
          y: centerY + index * yOffset - (yOffset * nodes.length) / 1.2, // Stagger vertically
        },
        style: {
          width: 80,
          backgroundColor: "#5DE7DD",
          border: "none",
          padding: 10,
          fontSize: 8,
        },

        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    } else {
      // Default position for other types if any exist
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        position: {
          x: centerX, // Position based on central layout if unspecified type
          y: centerY,
        },
      };
    }
  });
};
