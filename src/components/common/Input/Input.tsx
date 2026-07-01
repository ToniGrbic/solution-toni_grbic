import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
  fieldClassName?: string;
};

const Input = ({
  label,
  error,
  hint,
  id,
  fieldClassName,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) => {
  const inputId = id ?? props.name;
  const describedBy = [
    error ? `${inputId}-error` : undefined,
    hint ? `${inputId}-hint` : undefined,
    ariaDescribedBy,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clsx(styles.field, fieldClassName)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={clsx(styles.input, className)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {hint && (
        <span id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
