import { Dispatch, ReactNode, SetStateAction } from "react";

export type CharactersBoardTypes = {
  children: ReactNode;
  openList: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  limit: number;
  setOpenList: Dispatch<SetStateAction<boolean>>;
};
