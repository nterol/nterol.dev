import classes from "./card-wrapper.module.css";

type Props = { children: React.ReactNode; color: string };

const CardWrapper = ({ children, color }: Props) => {
  return (
    <article
      style={{ "--card-background": color } as React.CSSProperties}
      className={classes.wrapper}
    >
      {children}
    </article>
  );
};

export default CardWrapper;
