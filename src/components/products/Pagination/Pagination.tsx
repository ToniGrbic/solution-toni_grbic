import clsx from "clsx";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav className={styles.pagination} aria-label="Paginacija proizvoda">
      <button
        type="button"
        className={styles.btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Prethodna stranica"
      >
        ←
      </button>

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
            <button
              type="button"
              className={clsx(styles.btn, p === page && styles.active)}
              onClick={() => onPageChange(p)}
              aria-label={`Stranica ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        className={styles.btn}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Sljedeća stranica"
      >
        →
      </button>

      <span className={styles.info}>
        Stranica {page} od {totalPages}
      </span>
    </nav>
  );
};

export default Pagination;
