import Link from "next/link";

import e from "@components/quarks/line-grid.module.css";
import Logo from "@components/atoms/logo";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.container} ${e.line_grid}`}>
        <Link href="/">
          <Logo />
        </Link>
        <nav className={e.line_grid}>
          <Link href="/about">A propos</Link>
          <Link href="/experiences">Me contacter</Link>
        </nav>
      </div>
    </header>
  );
}
