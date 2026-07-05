import { Button, UserCenter } from "@/components/common";
import { useAuth } from "@/context/auth/useAuth";
import useDismissiblePanel from "@/hooks/useDismissiblePanel";
import { Routes } from "@/types/enums";
import clsx from "clsx";
import { useCallback, useEffect, useId, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useLocation } from "react-router";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = () => setIsOpen((open) => !open);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useDismissiblePanel({ isOpen, onClose: close, lockScroll: true });

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
        data-testid="sidebar-menu-toggle"
      >
        <span className={styles.toggleIcon} aria-hidden="true">
          {isOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
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
        inert={!isOpen}
        data-testid="sidebar-nav"
      >
        <NavLink
          to={Routes.PRODUCTS}
          className={linkClass}
          onClick={close}
          viewTransition
          prefetch="intent"
          data-testid="sidebar-link-products"
        >
          Proizvodi
        </NavLink>
        <NavLink
          to={Routes.FAVORITES}
          className={linkClass}
          onClick={close}
          viewTransition
          prefetch="intent"
          data-testid="sidebar-link-favorites"
        >
          Favoriti
        </NavLink>
        {isAuthenticated && user ? (
          <>
            <Button unstyled className={styles.link} onClick={handleLogout}>
              Odjava
            </Button>
            <UserCenter
              user={user}
              isOpen={isOpen}
              toggle={toggle}
              menuId={menuId}
              hasChevron={false}
            />
          </>
        ) : (
          <NavLink
            to={Routes.LOGIN}
            className={linkClass}
            onClick={close}
            data-testid="sidebar-link-login"
          >
            Prijava
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
