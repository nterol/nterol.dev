import Grid from "./grid";
import c from "./latest-news.module.css";

const PlusButton = () => <button className={c.plus_button}>+</button>;

export const LatestNews = () => (
  <div className={c.page}>
    <div>
      <h1>Latest news</h1>
      <PlusButton />
    </div>
    <Grid />
  </div>
);
