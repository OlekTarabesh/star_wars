import { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "@xyflow/react";

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
  getStarships,
  StashipTypes,
} from "./api";
import { arrangeNodesInGraph } from "./utils/helpers";

import styles from "./app.styles.module.scss";

export default function App() {
  const [charactersData, setCharactersData] =
    useState<CharactersResponse | null>(null);
  const [filmsData, setFilmsData] = useState<FilmsResponse | null>(null);
  const [starships, setStarships] = useState<StashipTypes[]>([]);
  console.log(charactersData, "charactersData");
  console.log(filmsData, "filmsData");
  console.log(starships, "starships");

  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    const data = (await getCharacters(page)) as CharactersResponse;
    setCharactersData(data);
    setLimit(data?.count);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    getCharactersHandler();
  }, [getCharactersHandler]);

  const getFilmsHandler = async () => {
    const films = (await getFilms()) as FilmsResponse;

    setFilmsData(films);
  };

  useEffect(() => {
    getFilmsHandler();
  }, []);

  const getStarshipsHandler = async () => {
    const starshipsData = (await getStarships()) as StashipTypes[];

    setStarships(starshipsData);
  };

  useEffect(() => {
    getStarshipsHandler();
  }, []);

  // console.log(nodes, "nodes");

  const generateCharactersConnections = useCallback(
    (id: string | number) => {
      const result = [];
      // looking for the clicked character
      const character = charactersData?.results.find((item) => item.id === id);
      if (character) result.push(character);

      // looking for the films where character was in
      filmsData?.results?.forEach((f) => {
        // character?.starships?.forEach((ship) => {})
        const hasFilm = character?.films?.includes(f.id);
        if (hasFilm) {
          // set edges and source for films
          const filmWithEdges = {
            ...f,
            filmNode: true,
            edge: {
              id: `${f.id}`,
              source: `${character?.id}`,
            },
          };
          result.push(filmWithEdges);
        }
      });

      // STARSHIP CONNECTIONS
      starships?.forEach((starship) => {
        const foundShip = character?.starships?.find(
          (ship) => starship.id === ship
        );

        if (foundShip) {
          const sourceFilm = starship?.films.reduce((_, curr) => curr, 0);
          const shipWithEdges = {
            ...starship,
            edge: {
              id: `${foundShip}`,
              source: `${sourceFilm}`,
            },
          };

          result.push(shipWithEdges);
        }
      });

      return result;
    },
    [charactersData?.results, filmsData?.results, starships]
  );

  const chooseACharacter = useCallback(
    (id: string | number) => {
      const selectedCharacter = generateCharactersConnections(id);
      const edgesOnly = selectedCharacter.filter((item) => item.edge);
      const myEdges = edgesOnly.map((item) => {
        return {
          id: `${item.edge.id}`,
          source: item?.edge?.source,
          target: item?.edge?.id,
          animated: true,
        };
      });

      setNodes(arrangeNodesInGraph(selectedCharacter, 300, 360, 200, true));
      setEdges(myEdges);
    },
    [generateCharactersConnections]
  );

  return (
    <main className={styles.wrapper}>
      <section className={styles.charList}>
        <Title title="Characters" />
        {isLoading ? (
          <Loading />
        ) : (
          <CharactersList
            characters={charactersData?.results}
            chooseACharacter={chooseACharacter}
          />
        )}
        <Buttons setPage={setPage} page={page} limit={limit} />
      </section>

      <section className={styles.reactFlow}>
        <ReactFlowBlock nodes={nodes} edges={edges} />
      </section>
    </main>
  );
}
