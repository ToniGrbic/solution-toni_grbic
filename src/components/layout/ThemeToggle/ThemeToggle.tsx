import Button from "@/components/common/Button";
import { useTheme } from "@/context/ThemeProvider";
import { Theme } from "@/types/enums";
import styles from "./ThemeToggle.module.scss";
import { MdSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";

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
      {isDark ? <MdSunny/> : <FaRegMoon/>}
    </Button>
  );
};

export default ThemeToggle;
