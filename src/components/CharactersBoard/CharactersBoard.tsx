import { useState } from "react";

import MobileButtons from "../MobileButtons/MobileButtons";
import Title from "../Title/Title";
import Buttons from "../Buttons/Buttons";

import { CharactersBoardTypes } from "./types";

import styles from "./styles.module.scss";

const CharactersBoard = ({
  children,
  setPage,
  page,
  limit,
}: CharactersBoardTypes) => {
  const [openList, setOpenList] = useState(false);
  return (
    <section
      className={
        !openList ? `${styles.charList}` : `${styles.charList} ${styles.opened}`
      }
    >
      <MobileButtons setOpenList={setOpenList} openList={openList} />
      <Title title="Characters" />
      {children}
      <Buttons setPage={setPage} page={page} limit={limit} />
    </section>
  );
};

export default CharactersBoard;
