import { Character } from "../../api";

export type CharactersListTypes = {
  characters: Character[] | undefined;
  chooseACharacter: (id: string | number) => void;
  isLoading: boolean;
};
