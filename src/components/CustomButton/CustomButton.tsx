import { ButtonTypes } from "./types";

import styles from "./styles.module.scss";

const CustomButton = ({ isDisabled, onClick, title }: ButtonTypes) => {
  return (
    <button
      className={styles.button}
      disabled={isDisabled}
      onClick={onClick}
      style={{
        opacity: isDisabled ? "0.5" : "",
        pointerEvents: isDisabled ? "none" : undefined,
      }}
    >
      {title}
    </button>
  );
};

export default CustomButton;
