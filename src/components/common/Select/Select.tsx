import clsx from "clsx";
import type { ReactNode, SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  id?: string;
  fieldClassName?: string;
  children: ReactNode;
}

const Select = ({
  label,
  error,
  id,
  fieldClassName,
  className,
  children,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) => {
  const selectId = id ?? props.name;
  const describedBy = [error ? `${selectId}-error` : undefined, ariaDescribedBy]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clsx(styles.field, fieldClassName)}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        className={clsx(styles.select, className)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span id={`${selectId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
