import Button from "@/components/common/Button";
import { ButtonVariant, Routes } from "@/types/enums";
import { Link } from "react-router";
import styles from "./NotFound.module.scss";

const NotFound = () => (
  <section className={styles.page} aria-labelledby="not-found-title">
    <p className={styles.code} aria-hidden="true">
      404
    </p>
    <h1 id="not-found-title" className={styles.title}>
      Stranica nije pronađena
    </h1>
    <p className={styles.message}>
      Stranica koju tražite ne postoji ili je premještena. Provjerite URL ili se
      vratite na katalog proizvoda.
    </p>
    <div className={styles.actions}>
      <Link to={Routes.PRODUCTS}>
        <Button>Natrag na proizvode</Button>
      </Link>
      <Button
        variant={ButtonVariant.SECONDARY}
        onClick={() => window.history.back()}
      >
        Idi natrag
      </Button>
    </div>
  </section>
);

export default NotFound;
