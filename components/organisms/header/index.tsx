import Link from "next/link";

import e from "@components/quarks/line-grid.module.css";
import Logo from "@components/atoms/logo";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.container} ${e.line_grid}`}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <nav className={e.line_grid}>
          <Link href="/about">
            <h3>A propos</h3>
          </Link>
          <Link href="/experiences">
            <h3>Me contacter</h3>
          </Link>
        </nav>
      </div>
    </header>
  );
}
