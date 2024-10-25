import { Character } from "../api";

export const arrangeNodesInGrid = (
  nodes: Character[],
  positionX: number,
  positionY: number,
  gridSize: boolean
) => {
  return nodes.map((node, index: number) => ({
    name: `${node.name}`,
    id: `${node?.id}`,
    type: "input",
    data: { label: node?.name },
    position: {
      x: !gridSize ? positionX : (index % 3) * positionX, // Columns
      y: !gridSize ? positionY : Math.floor(index / 3) * positionX, // Rows
    },
  }));
};
