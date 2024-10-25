import { CharacterTypes } from "./types";

import styles from "./styles.module.scss";

const Character = ({ character, chooseACharacter }: CharacterTypes) => {
  return (
    <li
      className={styles.wrapper}
      onClick={() => chooseACharacter(character.id)}
    >
      {character.name}
    </li>
  );
};

export default Character;
