import type { ReactNode } from "react";
import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <a href="#main-content" className={styles.skipLink}>
      Preskoči na sadržaj
    </a>
    <Header />
    <main id="main-content" className={styles.main}>
      {children ?? <Outlet />}
    </main>
  </div>
);

export default Layout;
