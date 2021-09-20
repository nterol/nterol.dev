import { atom, useAtom } from "jotai";
import Article from "../article";
import styles from "./grid.module.scss";

const ArticlesAtom = atom([
  { simple: 1, image: true, id: 0 },
  { simple: 5, image: false, id: 1 },
  { simple: 3, image: false, id: 2 },
  { simple: 4, image: true, id: 3 },
  { simple: 8, image: false, id: 4 },
  { simple: 1, image: true, id: 5 },
  { simple: 5, image: false, id: 6 },
  { simple: 3, image: false, id: 7 },
  { simple: 4, image: true, id: 8 },
  { simple: 8, image: false, id: 9 },
  { simple: 1, image: true, id: 10 },
  { simple: 5, image: false, id: 11 },
  { simple: 3, image: false, id: 12 },
  { simple: 4, image: true, id: 13 },
  { simple: 8, image: false, id: 14 },
]);

function Grid() {
  const [articles] = useAtom(ArticlesAtom);

  return (
    <div className={styles.grid}>
      {articles.map((article, i) => (
        <Article key={`${article.simple}-${i}`} {...article} number={i + 1} />
      ))}
    </div>
  );
}
export default Grid;
