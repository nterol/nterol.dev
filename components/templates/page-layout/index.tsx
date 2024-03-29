import { type MetaProps, Meta } from '@/components/organisms/Meta';
import Header from '@/components/organisms/header';
import { Footer } from '@/components/organisms/page-footer';

import styles from './page-layout.module.css';

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
        {children}
        <Footer />
      </div>
    </>
  );
}
