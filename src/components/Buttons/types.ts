import { Dispatch, SetStateAction } from "react";

export type ButtonsTypes = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
};
