import styles from "./Masonry.module.css";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

const Masonry = ({ children, tag: Tag = "div" }: Props): JSX.Element => (
  <Tag className={styles.wrapper}>{children}</Tag>
);

export default Masonry;
