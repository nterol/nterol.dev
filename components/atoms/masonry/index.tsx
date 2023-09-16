import styles from "./Masonry.module.css";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

const Masonry = ({ children }: Props): JSX.Element => (
  <section className={styles.wrapper}>{children}</section>
);

export default Masonry;
