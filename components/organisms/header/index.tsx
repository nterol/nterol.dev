import Link from "next/link";

import e from "@components/quarks/line-grid.module.css";
import Logo from "@components/atoms/logo";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={`${classes.container} ${e.line_grid}`}>
      <Logo />
      <nav className={e.line_grid}>
        <Link href="/about">
          <h3>A propos</h3>
        </Link>
        <Link href="/contact">
          <h3>Me contacter</h3>
        </Link>
      </nav>
    </header>
  );
}
