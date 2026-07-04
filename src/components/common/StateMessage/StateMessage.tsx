import { Button } from "@/components/common";
import { ButtonVariant, StateMessageVariant } from "@/types/enums";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./StateMessage.module.scss";

interface StateMessageProps {
  title: string;
  message: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  variant?: StateMessageVariant;
}

interface ErrorProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onRetry: () => void;
}

interface EmptyProps {
  title?: string;
  message: string;
}

const StateMessageBase = ({
  title,
  message,
  icon,
  actionLabel,
  onAction,
  variant = StateMessageVariant.DEFAULT,
}: StateMessageProps) => (
  <section
    className={clsx(
      styles.state,
      variant === StateMessageVariant.ERROR && styles.error,
    )}
    role={variant === StateMessageVariant.ERROR ? "alert" : "status"}
    aria-live="polite"
  >
    {icon && (
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
    )}
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.message}>{message}</p>
    {actionLabel && onAction && (
      <Button variant={ButtonVariant.SECONDARY} onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </section>
);

const Error = ({
  title = "Greška pri učitavanju",
  message = "Došlo je do greške. Molimo pokušajte ponovno.",
  onRetry,
}: ErrorProps) => (
  <StateMessageBase
    variant={StateMessageVariant.ERROR}
    title={title}
    message={message}
    icon="⚠"
    actionLabel="Pokušaj ponovno"
    onAction={onRetry}
  />
);

const Empty = ({ title = "Nema rezultata", message }: EmptyProps) => (
  <StateMessageBase title={title} message={message} icon="🔍" />
);

const StateMessage = Object.assign(StateMessageBase, { Error, Empty });

export default StateMessage;
