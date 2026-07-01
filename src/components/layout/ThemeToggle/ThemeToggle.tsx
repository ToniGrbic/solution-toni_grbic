import Button from "@/components/common/Button";
import { useTheme } from "@/context/ThemeProvider";
import { Theme } from "@/types/enums";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <Button
      unstyled
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Uključi svijetlu temu" : "Uključi tamnu temu"}
      aria-pressed={isDark}
    >
      {isDark ? "☀" : "☾"}
    </Button>
  );
};

export default ThemeToggle;
