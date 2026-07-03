import { StateMessage } from "@/components/common";
import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReset = () => {
    const { onReset } = this.props;

    if (onReset) {
      onReset();
      return;
    }

    window.location.reload();
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return (
        <div className={styles.wrapper}>
          <StateMessage.Error
            title="Nešto je pošlo po krivu"
            message={
              error?.message ??
              "Došlo je do neočekivane greške. Pokušajte ponovno učitati stranicu."
            }
            onRetry={this.handleReset}
          />
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
