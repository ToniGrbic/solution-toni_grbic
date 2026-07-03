import { Button } from "@/components/common";
import { Sidebar, ThemeToggle, UserMenu } from "@/components/layout";
import { useAuth } from "@/context/AuthProvider";
import { ButtonVariant, Routes } from "@/types/enums";
import clsx from "clsx";
import { NavLink } from "react-router";
import styles from "./Header.module.scss";

const Header = () => {
  const { isAuthenticated } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.active);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink
          to={Routes.PRODUCTS}
          className={styles.logo}
          viewTransition
          prefetch="intent"
        >
          Katalog proizvoda
        </NavLink>

        <nav className={styles.nav} aria-label="Glavna navigacija">
          <NavLink
            to={Routes.PRODUCTS}
            className={navLinkClass}
            viewTransition
            prefetch="intent"
          >
            Proizvodi
          </NavLink>
          <NavLink
            to={Routes.FAVORITES}
            className={navLinkClass}
            viewTransition
            prefetch="intent"
          >
            Favoriti
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <div className={styles.desktopActions}>
            {isAuthenticated ? (
              <UserMenu />
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
