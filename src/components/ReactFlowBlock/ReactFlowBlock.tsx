import { Node, ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// import { initialEdges, initialNodes } from "./nodes";

function ReactFlowBlock({ nodes }: { nodes: Node[] | undefined }) {
  //   const arrangeInGrid = () => {
  //     setNodes((nodes) => arrangeNodesInGrid(nodes));
  //   };

  //   const onNodesChange: OnNodesChange = useCallback(
  //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //     [setNodes]
  //   );
  //   const onEdgesChange: OnEdgesChange = useCallback(
  //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //     [setEdges]
  //   );

  return (
    <>
      <ReactFlow nodes={nodes} fitView />
      {/* <button onClick={arrangeInGrid}>click</button> */}
    </>
  );
}

export default ReactFlowBlock;
