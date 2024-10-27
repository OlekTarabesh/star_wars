import { Dispatch, SetStateAction } from "react";

import cross from "../../assets/cross.svg";
import burger from "../../assets/burger.svg";

import styles from "./styles.module.scss";

const MobileButtons = ({
  setOpenList,
  openList,
}: {
  setOpenList: Dispatch<SetStateAction<boolean>>;
  openList: boolean;
}) => {
  return (
    <button
      className={styles.crossBtn}
      onClick={() => setOpenList((prev) => !prev)}
    >
      <img src={openList ? cross : burger} alt="" />
    </button>
  );
};

export default MobileButtons;
