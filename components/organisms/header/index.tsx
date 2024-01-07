import { useAtomValue } from 'jotai';
import Link from 'next/link';

import { GithubIcon, LinkedInIcon } from '@/components/atoms/icons';
import Logo from '@/components/atoms/logo';
import { viewerDataAtom } from '@/store/viewer-data';

import classes from './header.module.css';

export default function Header() {
  const viewerData = useAtomValue(viewerDataAtom);
  return (
    <header className={classes.header}>
      <div className={`${classes.container} grid grid-flow-col justify-between items-center`}>
        <Link href="/">
          <Logo />
        </Link>
        <nav className="grid grid-flow-col justify-between items-center">
          <div className="flex gap-3">
            <a className="w-6 aspect-square text-inkblue" href={viewerData?.url}>
              <GithubIcon />
            </a>
            <a className="w-6 aspect-square text-inkblue">
              <LinkedInIcon />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
