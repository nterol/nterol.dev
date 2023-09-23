import classes from "./glowing-text.module.css";

type Props = {
  startColor?: string;
  targetColor?: string;
  children: React.ReactNode;
};

export const GlowingText = ({ children, startColor, targetColor }: Props) => (
  <span
    style={
      {
        "--target-color": targetColor,
        "--start-color": startColor,
      } as React.CSSProperties
    }
    className={classes.animated_font}
  >
    {children}
  </span>
);
