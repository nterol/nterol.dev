import Link from 'next/link';

import Logo from '@/components/atoms/logo';

import classes from './header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.container} grid grid-flow-col justify-between items-center`}>
        <Link href="/">
          <Logo />
        </Link>
        <nav className="grid grid-flow-col justify-between items-center">
          <a className="font-extrabold" href="#articles">
            Articles
          </a>
          <a className="font-bold" href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
