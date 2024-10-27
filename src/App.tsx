import { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "@xyflow/react";

import CharactersList from "./components/CharactersList/CharactersList";
import ReactFlowBlock from "./components/ReactFlowBlock/ReactFlowBlock";
import CharactersBoard from "./components/CharactersBoard/CharactersBoard";

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
  // Data states
  const [charactersData, setCharactersData] =
    useState<CharactersResponse | null>(null);
  const [filmsData, setFilmsData] = useState<FilmsResponse | null>(null);
  const [starships, setStarships] = useState<StashipTypes[]>([]);
  // UI states
  const [limit, setLimit] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [openList, setOpenList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ReactFlow states
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    const data = (await getCharacters(page)) as CharactersResponse;
    // Some of the ids overlapping with films and starships, so I changed them
    const newCharactersIds = data.results.map((res) => ({
      ...res,
      id: `${res.id}` + 1,
    }));
    setCharactersData(() => ({ ...data, results: newCharactersIds }));
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

  const generateCharactersConnections = useCallback(
    (id: string | number) => {
      const result = [];

      // Find the selected character
      const character = charactersData?.results.find((item) => item.id === id);
      if (character) result.push(character);

      // Loop through each film in which the character appears
      filmsData?.results?.forEach((film) => {
        if (character?.films?.includes(film.id)) {
          // Add film node and create edge from character to film
          const filmWithEdges = {
            ...film,
            filmNode: true,
            edge: {
              id: `edge-${character.id}-to-film-${film.id}`,
              source: `${character.id}`,
              target: `${film.id}`,
            },
          };
          result.push(filmWithEdges);

          // Loop through each starship in the film
          film.starships.forEach((starshipId) => {
            if (character.starships?.includes(starshipId)) {
              // Find the starship object
              const starship = starships.find((ship) => ship.id === starshipId);
              if (starship) {
                // Add starship node and create edge from film to starship
                const starshipWithEdges = {
                  ...starship,
                  starshipNode: true,
                  edge: {
                    id: `edge-film-${film.id}-to-starship-${starship.id}`,
                    source: `${film.id}`,
                    target: `${starship.id}`,
                  },
                };
                result.push(starshipWithEdges);
              }
            }
          });
        }
      });
      return result;
    },
    [charactersData?.results, filmsData?.results, starships]
  );
  // Selecting character on click
  const chooseACharacter = useCallback(
    (id: string | number) => {
      const selectedCharacter = generateCharactersConnections(id);
      const dataWithEdgesOnly = selectedCharacter.filter((item) => item.edge);
      const edgesFlow = dataWithEdgesOnly.map((item) => {
        return {
          id: `edge-${item.edge.source}-${item.edge.target}`, // Unique edge ID
          source: `${item.edge.source}`, // Ensure it matches a node ID exactly
          target: `${item.edge.target}`, // Ensure it matches a node ID exactly
          animated: true,
        };
      });

      setNodes(arrangeNodesInGraph(selectedCharacter, 300, 200, 300, 60));
      setEdges(edgesFlow);
    },
    [generateCharactersConnections]
  );

  return (
    <main className={styles.wrapper}>
      <CharactersBoard
        openList={openList}
        setPage={setPage}
        page={page}
        limit={limit}
        setOpenList={setOpenList}
      >
        <CharactersList
          characters={charactersData?.results}
          chooseACharacter={chooseACharacter}
          isLoading={isLoading}
        />
      </CharactersBoard>
      <ReactFlowBlock nodes={nodes} edges={edges} />
    </main>
  );
}
