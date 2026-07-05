import Button from "@/components/common/Button";
import { useTheme } from "@/context/theme/useTheme";
import { Theme } from "@/types/enums";
import { FaRegMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
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
      {isDark ? <MdSunny /> : <FaRegMoon />}
    </Button>
  );
};

export default ThemeToggle;
