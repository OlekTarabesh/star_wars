import CustomButton from "../CustomButton/CustomButton";

import { ButtonsTypes } from "./types";

import styles from "./styles.module.scss";

const Buttons = ({ page, setPage, limit }: ButtonsTypes) => {
  const charactersPerPage = 10;
  const totalPages = Math.ceil(limit / charactersPerPage);

  const isPrevButtonDisabled = page === 1;
  const isNextButtonDisabled = page === totalPages;

  const prevPage = () => {
    setPage((prev) => {
      if (prev === 1) return prev;

      return prev - 1;
    });
  };

  const nextPage = () => setPage((prev) => prev + 1);

  return (
    <div className={styles.wrapper}>
      <CustomButton
        title={"prev"}
        isDisabled={isPrevButtonDisabled}
        onClick={prevPage}
      />
      <CustomButton
        title={"next"}
        isDisabled={isNextButtonDisabled}
        onClick={nextPage}
      />
    </div>
  );
};

export default Buttons;
