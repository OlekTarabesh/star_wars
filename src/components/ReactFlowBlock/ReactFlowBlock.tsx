import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import styles from "./styles.module.scss";
import Loading from "../Loading/Loading";

function ReactFlowBlock({
  nodes,
  edges,
  isLoading,
}: {
  nodes: Node[];
  edges: Edge[];
  isLoading: boolean;
}) {
  const rfStyle = {
    backgroundColor: "#b8cfff1b",
  };

  return (
    <section className={styles.reactFlow}>
      <ReactFlow nodes={nodes} edges={edges} fitView style={rfStyle}>
        <Loading isLoading={isLoading} />
        <Controls />
        <Background color="#00000014" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </section>
  );
}

export default ReactFlowBlock;
