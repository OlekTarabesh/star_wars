import loading from "../../assets/loading.svg";
import styles from "./styles.module.scss";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading ? (
        <div className={styles.wrapper}>
          <img src={loading} alt="" className={styles.icon} />
        </div>
      ) : null}
    </>
  );
};

export default Loading;
