import styles from "./styles.module.scss";

const Title = ({ title }: { title: string }) => {
  return <h1 className={styles.wrapper}>{title}</h1>;
};

export default Title;
