import { Button } from "@/components/common";
import clsx from "clsx";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label: string;
}

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  label,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 0,
  );

  return (
    <nav className={styles.pagination} aria-label={label}>
      <Button
        unstyled
        className={styles.btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Prethodna stranica"
      >
        <FaArrowLeftLong />
      </Button>

      {visiblePages.map((p, index) => {
        const prev = visiblePages[index - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;

        return (
          <span key={p} style={{ display: "contents" }}>
            {showEllipsis && (
              <span className={styles.info} aria-hidden="true">
                …
              </span>
            )}
            <Button
              unstyled
              className={clsx(styles.btn, p === page && styles.active)}
              onClick={() => onPageChange(p)}
              aria-label={`Stranica ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Button>
          </span>
        );
      })}

      <Button
        unstyled
        className={styles.btn}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Sljedeća stranica"
      >
        <FaArrowRightLong />
      </Button>

      <span className={styles.info}>
        Stranica {page} od {totalPages}
      </span>
    </nav>
  );
};

export default Pagination;
