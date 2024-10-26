import {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

function ReactFlowBlock({
  nodes,
  edges,
}: {
  nodes: Node[] | undefined;
  edges: Edge[];
}) {
  const rfStyle = {
    backgroundColor: "#b8cfff1b",
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        className={"node"}
        style={rfStyle}
      >
        <Background color="#00000014" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </>
  );
}

export default ReactFlowBlock;
