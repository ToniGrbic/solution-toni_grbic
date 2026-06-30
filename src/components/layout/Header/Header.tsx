import Button from "@/components/common/Button";
import Sidebar from "@/components/layout/Sidebar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAuth } from "@/context/AuthProvider";
import { ButtonVariant, Routes } from "@/types/enums";
import clsx from "clsx";
import { NavLink } from "react-router";
import styles from "./Header.module.scss";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.active);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to={Routes.PRODUCTS} className={styles.logo}>
          Katalog proizvoda
        </NavLink>

        <nav className={styles.nav} aria-label="Glavna navigacija">
          <NavLink to={Routes.PRODUCTS} className={navLinkClass}>
            Proizvodi
          </NavLink>
          <NavLink to={Routes.FAVORITES} className={navLinkClass}>
            Favoriti
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <div className={styles.desktopActions}>
            {isAuthenticated && user && (
              <span className={styles.user}>
                {user.firstName} {user.lastName}
              </span>
            )}
            {isAuthenticated ? (
              <Button variant={ButtonVariant.GHOST} onClick={logout}>
                Odjava
              </Button>
            ) : (
              <NavLink to={Routes.LOGIN}>
                <Button variant={ButtonVariant.SECONDARY}>Prijava</Button>
              </NavLink>
            )}
          </div>

          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
