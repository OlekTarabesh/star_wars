import { Character } from "../../api";

export type CharacterTypes = {
  character: Character;
  chooseACharacter: (id: string | number) => void;
};
