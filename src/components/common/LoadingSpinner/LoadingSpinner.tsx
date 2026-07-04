import clsx from "clsx";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  label?: string;
  className?: string;
}

const LoadingSpinner = ({
  label = "Učitavanje",
  className,
}: LoadingSpinnerProps) => (
  <div
    className={clsx(styles.wrapper, className)}
    role="status"
    aria-live="polite"
    aria-label={label}
  >
    <span className={styles.spinner} aria-hidden="true" />
  </div>
);

export default LoadingSpinner;
