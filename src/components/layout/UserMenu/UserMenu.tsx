import { Button, UserCenter } from "@/components/common";
import { useAuth } from "@/context/auth/useAuth";
import useDismissiblePanel from "@/hooks/useDismissiblePanel";
import { useCallback, useId, useRef, useState } from "react";
import styles from "./UserMenu.module.scss";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = () => setIsOpen((open) => !open);

  useDismissiblePanel({ isOpen, onClose: close, containerRef });

  if (!user) return null;

  const displayName =
    `${user.firstName} ${user.lastName}`.trim() || user.username;

  const handleLogout = () => {
    close();
    logout();
  };

  return (
    <div className={styles.root} ref={containerRef}>
      <UserCenter user={user} isOpen={isOpen} toggle={toggle} menuId={menuId} />

      {isOpen && (
        <div id={menuId} className={styles.dropdown} role="menu">
          <div className={styles.profile}>
            <img
              src={user.image}
              alt="avatar"
              className={styles.profileAvatar}
              width={40}
              height={40}
            />
            <div className={styles.profileText}>
              <span className={styles.profileName}>{displayName}</span>
              <span className={styles.profileEmail}>{user.email}</span>
            </div>
          </div>
          <Button
            className={styles.menuItem}
            role="menuitem"
            onClick={handleLogout}
          >
            Odjava
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
