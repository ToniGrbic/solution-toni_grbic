import { ButtonVariant } from "@/types/enums";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
};

const Button = ({
  variant = ButtonVariant.PRIMARY,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      styles.base,
      styles[variant],
      fullWidth && styles.fullWidth,
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
