import { Character } from "../api";

export const arrangeNodesInGraph = (
  nodes: Character[],
  centerX: number,
  centerY: number,
  radius: number,
  graphLayout: boolean
) => {
  return nodes.map((node, index: number) => {
    if (index === 0) {
      // Center the main node (index 0)
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "input",
        data: { label: node.name || node.title },
        position: {
          x: centerX,
          y: centerY,
        },
        style: {
          backgroundColor: "#516FC080",
          border: "none",
          fontWeight: 600,
        },
      };
    } else {
      // Arrange other nodes around the center in a circle
      const angle = (2 * Math.PI * (index - 1)) / (nodes.length - 1); // Offset index by 1 for non-center nodes

      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        className: "nodes",
        style: {
          width: 80,
          backgroundColor: node.filmNode ? "#FF9A5160" : "#5DE7DD",
          border: "none",
          padding: 10,
          fontSize: 8,
        },
        position: graphLayout
          ? {
              x: centerX + radius * Math.cos(angle), // Circular X position
              y: centerY + radius * Math.sin(angle), // Circular Y position
            }
          : {
              x: centerX, // Static X position if graphLayout is false
              y: centerY, // Static Y position if graphLayout is false
            },
        animated: false,
      };
    }
  });
};
