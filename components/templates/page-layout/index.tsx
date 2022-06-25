import Header from "@components/organisms/header";
import Meta, { MetaProps } from "@components/organisms/Meta";
import { Footer } from "@components/organisms/page-footer";

import styles from "./page-layout.module.css";

type Props = {
  children: React.ReactNode;
  meta: MetaProps;
};

export default function PageLayout({ meta, children }: Props) {
  return (
    <>
      <Meta {...meta} />
      <Header />
      <div className={styles.page_container}>
        <div className={styles.wrapper}>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
