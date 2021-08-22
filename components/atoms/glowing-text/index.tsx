import classes from "./glowing-text.module.css";

type Props = {
  color?: string;
  children: React.ReactNode;
};

const GlowingText = ({ children, color }: Props) => (
  <span
    style={{ "--custom-color": color } as React.CSSProperties}
    className={classes.animated_font}
  >
    {children}
  </span>
);

export default GlowingText;
