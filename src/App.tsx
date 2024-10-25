import { useCallback, useEffect, useState } from "react";
import { Node } from "@xyflow/react";

import CharactersList from "./components/CharactersList/CharactersList";
import Buttons from "./components/Buttons/Buttons";
import Loading from "./components/Loading/Loading";
import Title from "./components/Title/Title";
import ReactFlowBlock from "./components/ReactFlowBlock/ReactFlowBlock";

import {
  CharactersResponse,
  FilmsResponse,
  getCharacters,
  getFilms,
} from "./api";
import { arrangeNodesInGrid } from "./utils/helpers";

import styles from "./app.styles.module.scss";

export default function App() {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [films, setFilms] = useState<FilmsResponse | null>(null);

  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [nodes, setNodes] = useState<Node[]>();
  // const [edges, setEdges] = useState<Edge[]>();

  const getCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    const data = (await getCharacters(page)) as CharactersResponse;
    setData(data);
    setLimit(data?.count);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    getCharactersHandler();
  }, [getCharactersHandler]);

  const getFilmsHandler = async () => {
    const filmsData = (await getFilms()) as FilmsResponse;

    setFilms(filmsData);
  };
  console.log(films, "films");

  useEffect(() => {
    getFilmsHandler();
  }, []);

  const chooseACharacter = useCallback(
    (id: string | number) => {
      const selectedCharacter = data?.results.filter((char) => char.id === id);
      if (!selectedCharacter) return;

      setNodes(arrangeNodesInGrid(selectedCharacter, 45, -200, false));
    },
    [data?.results]
  );

  return (
    <main className={styles.wrapper}>
      <section className={styles.charList}>
        <Title title="Characters" />
        {isLoading ? (
          <Loading />
        ) : (
          <CharactersList
            characters={data?.results}
            chooseACharacter={chooseACharacter}
          />
        )}
        <Buttons setPage={setPage} page={page} limit={limit} />
      </section>

      <section className={styles.reactFlow}>
        <ReactFlowBlock nodes={nodes} />
      </section>
    </main>
  );
}
