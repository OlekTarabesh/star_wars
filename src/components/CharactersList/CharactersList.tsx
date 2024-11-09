import { memo } from "react";

import Character from "../Character/Character";
import Loading from "../Loading/Loading";

import { CharactersListTypes } from "./types";

import styles from "./styles.module.scss";

const CharactersList = memo(
  ({ characters, chooseACharacter, isLoading }: CharactersListTypes) => {
    return (
      <ul className={styles.wrapper}>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            {characters?.map((char) => (
              <Character
                key={char.id}
                character={char}
                chooseACharacter={chooseACharacter}
              />
            ))}
          </>
        )}
      </ul>
    );
  }
);

export default CharactersList;
