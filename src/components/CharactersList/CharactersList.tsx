import { memo } from "react";

import Character from "../Character/Character";

import { CharactersListTypes } from "./types";

import styles from "./styles.module.scss";
import Loading from "../Loading/Loading";

const CharactersList = memo(
  ({ characters, chooseACharacter, isLoading }: CharactersListTypes) => {
    return (
      <ul className={styles.wrapper}>
        {isLoading ? (
          <Loading />
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
