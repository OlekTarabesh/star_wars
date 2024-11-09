import { Dispatch, ReactNode, SetStateAction } from "react";

export type CharactersBoardTypes = {
  children: ReactNode;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  limit: number;
};
