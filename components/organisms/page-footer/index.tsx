import classes from './page-footer.module.css';

export const Footer = () => (
  <footer className={`${classes.container} grid grid-flow-col justify-between items-center`}>
    <div>
      <p className="text-sm font-bold py-4">2021 - nterol</p>
    </div>
  </footer>
);
