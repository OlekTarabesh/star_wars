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

function ReactFlowBlock({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  const rfStyle = {
    backgroundColor: "#b8cfff1b",
  };

  return (
    <section className={styles.reactFlow}>
      <ReactFlow nodes={nodes} edges={edges} fitView style={rfStyle}>
        <Controls />
        <Background color="#00000014" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </section>
  );
}

export default ReactFlowBlock;
