import e from "@components/quarks/line-grid.module.css";

import classes from "./page-footer.module.css";

export const Footer = () => (
  <footer className={`${classes.container} ${e.line_grid}`}>
    <div>
      <p>2021 - nterol</p>
    </div>
  </footer>
);
