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
      <div className={styles.page_container}>
        <Header />
        <div className={styles.wrapper}>
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
