import { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "@xyflow/react";

import CharactersList from "./components/CharactersList/CharactersList";
import ReactFlowBlock from "./components/ReactFlowBlock/ReactFlowBlock";
import CharactersBoard from "./components/CharactersBoard/CharactersBoard";

import { CharactersResponse, getCharacters } from "./api";
import {
  arrangeNodesInGraph,
  generateCharactersConnections,
  generateEdges,
} from "./utils/helpers";

import styles from "./app.styles.module.scss";

export default function App() {
  // Data states
  const [charactersData, setCharactersData] =
    useState<CharactersResponse | null>(null);
  // UI states
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<{
    characters: boolean;
    connections: boolean;
  }>({
    characters: false,
    connections: false,
  });
  // ReactFlow states
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const setLoading = (key: "characters" | "connections", value: boolean) =>
    setIsLoading((prev) => ({ ...prev, [key]: value }));

  const getCharactersHandler = useCallback(async () => {
    setLoading("characters", true);
    const data = (await getCharacters(page)) as CharactersResponse;
    // Some of the ids overlapping with films and starships, so I changed them
    const newCharactersIds = data.results.map((res) => ({
      ...res,
      id: res.id + 10,
    }));
    setCharactersData(() => ({ ...data, results: newCharactersIds }));
    setLimit(data?.count);
    setLoading("characters", false);
  }, [page]);

  useEffect(() => {
    getCharactersHandler();
  }, [getCharactersHandler]);

  // Selecting character on click
  const chooseACharacter = useCallback(
    async (id: string | number) => {
      setLoading("connections", true);
      setNodes([]);
      setEdges([]);

      const selectedCharacter = await generateCharactersConnections(
        id,
        charactersData
      );

      const characterWithEdges = generateEdges(selectedCharacter);

      setNodes(arrangeNodesInGraph(selectedCharacter, 300, 200, 300, 60));
      setEdges(characterWithEdges);
      setLoading("connections", false);
    },
    [charactersData]
  );

  return (
    <main className={styles.wrapper}>
      <CharactersBoard setPage={setPage} page={page} limit={limit}>
        <CharactersList
          characters={charactersData?.results}
          chooseACharacter={chooseACharacter}
          isLoading={isLoading.characters}
        />
      </CharactersBoard>
      <ReactFlowBlock
        nodes={nodes}
        edges={edges}
        isLoading={isLoading.connections}
      />
    </main>
  );
}
