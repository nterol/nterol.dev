import Link from "next/link";

import e from "@/components/quarks/line-grid.module.css";
import Logo from "@/components/atoms/logo";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.container} ${e.line_grid}`}>
        <Link href="/">
          <Logo />
        </Link>
        <nav className={e.line_grid}>
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
