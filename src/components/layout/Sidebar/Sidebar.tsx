import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthProvider";
import { Routes } from "@/types/enums";
import clsx from "clsx";
import { useCallback, useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = () => setIsOpen((open) => !open);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  const handleLogout = () => {
    close();
    logout();
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.active);

  return (
    <>
      <Button
        unstyled
        className={styles.toggle}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Zatvori izbornik" : "Otvori izbornik"}
      >
        <span className={styles.toggleIcon} aria-hidden="true">
          {isOpen ? "✕" : "☰"}
        </span>
      </Button>

      {isOpen && (
        <Button
          unstyled
          className={styles.backdrop}
          onClick={close}
          aria-label="Zatvori izbornik"
        />
      )}

      <nav
        id={menuId}
        className={clsx(styles.sidebar, isOpen && styles.open)}
        aria-label="Mobilna navigacija"
        aria-hidden={!isOpen}
      >
        <NavLink to={Routes.PRODUCTS} className={linkClass} onClick={close}>
          Proizvodi
        </NavLink>
        <NavLink to={Routes.FAVORITES} className={linkClass} onClick={close}>
          Favoriti
        </NavLink>
        {isAuthenticated ? (
          <Button unstyled className={styles.link} onClick={handleLogout}>
            Odjava
          </Button>
        ) : (
          <NavLink to={Routes.LOGIN} className={linkClass} onClick={close}>
            Prijava
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
