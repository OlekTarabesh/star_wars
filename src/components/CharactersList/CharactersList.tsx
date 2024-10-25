import { memo } from "react";

import Character from "../Character/Character";

import { CharactersListTypes } from "./types";

import styles from "./styles.module.scss";

const CharactersList = memo(
  ({ characters, chooseACharacter }: CharactersListTypes) => {
    return (
      <ul className={styles.wrapper}>
        {characters?.map((char) => (
          <Character
            key={char.id}
            character={char}
            chooseACharacter={chooseACharacter}
          />
        ))}
      </ul>
    );
  }
);

export default CharactersList;
