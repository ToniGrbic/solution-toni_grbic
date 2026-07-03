import { Button } from "@/components/common";
import type { AuthUserResponse } from "@/types/auth";
import clsx from "clsx";
import { IoChevronDown } from "react-icons/io5";
import styles from "./UserCenter.module.scss";

type UserCenterProps = {
  user: AuthUserResponse;
  isOpen: boolean;
  toggle: () => void;
  menuId: string;
  hasChevron?: boolean;
};

const UserCenter = ({ user, isOpen, toggle, menuId, hasChevron = true }: UserCenterProps) => {
  const displayName =
    `${user.firstName} ${user.lastName}`.trim() || user.username;

  return (
    <Button
      unstyled
      className={clsx(styles.trigger, isOpen && styles.triggerOpen)}
      onClick={toggle}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={menuId}
    >
      <img
        src={user.image}
        alt="avatar"
        className={styles.avatar}
        width={32}
        height={32}
      />
      <span className={styles.name}>{displayName}</span>
      {hasChevron && <IoChevronDown className={styles.chevron} aria-hidden="true" />}
    </Button>
  );
};

export default UserCenter;
