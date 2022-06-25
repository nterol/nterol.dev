import { RefObject, useEffect, useRef, useState } from "react";

import styles from "./article.module.css";

type SkullProps = {
  loaded: boolean;
  currentRef: RefObject<any>;
};

const ImgWithSkeleton = ({ loaded, currentRef }: SkullProps) =>
  loaded ? (
    <div className={styles.coverContainer}>
      <img
        className={styles.cover}
        src={currentRef.current.src}
        alt="article cover"
      />
    </div>
  ) : (
    <hr className={styles.image} />
  );

type Props = {
  simple: number;
  image: boolean;
  id: number;
  number: number;
};

const Article = ({ simple, image, id, number }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const imgRef = useRef<any>(null);
  const articleRef = useRef(null);

  /*  React.useEffect(() => {
    if (articleRef.current) {
      const centerX = articleRef.current.left + articleRef.current.width / 2;
      const centerY = articleRef.current.top + articleRef.current.height / 2;
      setCenterPoint({ centerX, centerY });
    }
  }, []);*/

  useEffect(() => {
    imgRef.current = new Image();
    imgRef.current.src = `https://picsum.photos/id/${1000 + id}/300/200`;
    if (imgRef.current.complete) setLoaded(true);
    else imgRef.current.onload = () => setLoaded(true);
  }, [id]);

  return (
    <article
      ref={articleRef}
      className={styles.article}
      style={{
        gridRowEnd: image
          ? `span ${
              simple + 3 > 4 ? simple + 4 - ((simple + 3) % 4) : simple + 4
            }`
          : `span ${simple > 5 ? simple - (simple % 5) - 3 : simple}`,
      }}
    >
      {/*<div
        style={{
          background: "red",
          width: "10px",
          height: "10px",
          position: "absolute",
          top: `${centerPoint.centerX}px`,
          left: `${centerPoint.centerY}px`
        }}
      />*/}
      <h3 style={!image ? { marginBottom: "10%" } : {}}>{number}</h3>
      {image ? (
        <ImgWithSkeleton loaded={loaded} currentRef={imgRef.current} />
      ) : null}
      {Array.from({ length: simple }).map((_, i) => (
        <hr key={i} className={styles.hr} />
      ))}
    </article>
  );
};

export default Article;
