import styles from "./latest-nexs.module.css";

export const LatestNews = () => (
  <div className={styles.page}>
    <div>
      <h1>Latest news</h1>
      <PlusButton />
    </div>
    <Grid />
  </div>
);
