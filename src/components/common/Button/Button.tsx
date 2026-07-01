import { ButtonVariant } from "@/types/enums";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  unstyled?: boolean;
  children: ReactNode;
};

const Button = ({
  variant = ButtonVariant.PRIMARY,
  fullWidth = false,
  unstyled = false,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      !unstyled && styles.base,
      !unstyled && styles[variant],
      !unstyled && fullWidth && styles.fullWidth,
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
