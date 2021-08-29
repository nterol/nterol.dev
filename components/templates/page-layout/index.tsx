import Header from "@components/organisms/header";
import { Footer } from "@components/organisms/page-footer";

import styles from "./page-layout.module.css";

type Props = {
  header: React.ReactNode;
  children: React.ReactNode;
};

export default function PageLayout({ header, children }: Props) {
  return (
    <div className={styles.page_container}>
      {header}
      <Header />

      <div className={styles.wrapper}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
