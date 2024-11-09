import { Position } from "@xyflow/react";
import {
  Character,
  CharactersResponse,
  FilmsResponse,
  getFilms,
  getStarships,
  StashipTypes,
} from "../api";

export const arrangeNodesInGraph = (
  nodes: Character[],
  centerX: number,
  centerY: number,
  xOffset: number,
  yOffset: number
) => {
  return nodes.map((node, index) => {
    if (index === 0) {
      // Position the main character node on the left
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "input",
        data: { label: node.name || node.title },
        position: {
          x: centerX - xOffset, // Shift to the left
          y: centerY,
        },
        style: {
          padding: 8,
          width: 90,
          backgroundColor: "#5f6Ff0",
          border: "none",
          fontWeight: 600,
          color: "#fff",
        },
        sourcePosition: Position.Right,
      };
    } else if (node.filmNode) {
      // Position film nodes to the right of the character node
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        position: {
          x: centerX, // Place films directly to the right of the character
          y: centerY + index * yOffset - (yOffset * nodes.length) / 2, // Stagger vertically based on index
        },
        style: {
          width: 80,
          backgroundColor: "#FF9fff",
          border: "none",
          padding: 10,
          fontSize: 8,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    } else if (node.starshipNode) {
      // Position starship nodes further to the right of the film nodes
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        position: {
          x: centerX + xOffset, // Shift further right from the films
          y: centerY + index * yOffset - (yOffset * nodes.length) / 1.2, // Stagger vertically
        },
        style: {
          width: 80,
          backgroundColor: "#5DE7DD",
          border: "none",
          padding: 10,
          fontSize: 8,
        },

        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    } else {
      // Default position for other types if any exist
      return {
        ...node,
        name: `${node.name || node.title}`,
        id: `${node.id}`,
        type: "default",
        data: { label: node.name || node.title },
        position: {
          x: centerX, // Position based on central layout if unspecified type
          y: centerY,
        },
      };
    }
  });
};

export const generateEdges = (selectedCharacter: Character[]) =>
  selectedCharacter
    .filter((item) => item.edge)
    .map((item) => {
      return {
        id: `edge-${item.edge.source}-${item.edge.target}`, // Unique edge ID
        source: `${item.edge.source}`, // Ensure it matches a node ID exactly
        target: `${item.edge.target}`, // Ensure it matches a node ID exactly
        animated: true,
      };
    });

export const generateCharactersConnections = async (
  id: string | number,
  charactersData: CharactersResponse | null
) => {
  const result = [];
  // Find the selected character
  const character = charactersData?.results.find((item) => item.id === id);

  if (character) {
    // get hero's films where he appears
    const charFilms = (await getFilms(character?.films)) as FilmsResponse;
    // get hero's starships which he drove
    const charShips = (await getStarships(
      character?.starships
    )) as StashipTypes[];

    result.push(character);
    // Loop through each film in which the character appears
    charFilms?.results?.forEach((film) => {
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
      }

      // Loop through each starship in the film
      film.starships.forEach((starshipId) => {
        if (character.starships?.includes(starshipId)) {
          // Find the starship object
          const starship = charShips?.find((item) => item?.id === starshipId);

          if (starship) {
            // Add starship node and create edge from film to starship
            const starshipWithEdges = {
              ...starship,
              starshipNode: true,
              edge: {
                id: `edge-film-${film.id}-to-starship-${starship?.id}`,
                source: `${film.id}`,
                target: `${starship?.id}`,
              },
            };
            result.push(starshipWithEdges);
          }
        }
      });
    });
  }
  return result;
};
