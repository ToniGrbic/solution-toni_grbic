import { ButtonVariant } from "@/types/enums";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  unstyled?: boolean;
  children?: ReactNode;
}

const Button = ({
  variant = ButtonVariant.PRIMARY,
  fullWidth = false,
  unstyled = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    type={type}
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
