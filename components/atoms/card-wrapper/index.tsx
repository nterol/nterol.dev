import { FC } from "react";

import classes from './CardWrapper.module.css';

const CardWrapper: FC = ({ children }) => {
  return <article className={classes.wrapper}>{children}</article>;
};

export default CardWrapper;
