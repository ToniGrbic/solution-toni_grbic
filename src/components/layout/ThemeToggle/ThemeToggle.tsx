import { useTheme } from "@/context/ThemeProvider";
import styles from "./ThemeToggle.module.scss";
import { Theme } from "@/types/enums";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Uključi svijetlu temu" : "Uključi tamnu temu"}
      aria-pressed={isDark}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
};

export default ThemeToggle;
