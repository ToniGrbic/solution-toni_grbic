import {
  PageHeader,
  Pagination,
  ProductCard,
  ProductGridSkeleton,
  StateMessage,
} from "@/components/common";
import { PAGE_SIZE } from "@/constants";
import { useFavoriteProducts } from "@/hooks/api/useFavoriteProducts";
import { useFavorites } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import styles from "./Favorites.module.scss";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE));
  const pageIds = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    // this can happen when removing all items from page on card heart button click
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useFavoriteProducts(pageIds);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Favoriti"
        subtitle={`Vaši spremljeni proizvodi (${favorites.length})`}
      />

      {favorites.length === 0 && (
        <StateMessage.Empty
          title="Nema favorita"
          message="Dodajte proizvode u favorite s liste proizvoda klikom na ikonu srca."
        />
      )}

      {favorites.length > 0 && isLoading && (
        <ProductGridSkeleton count={pageIds.length} />
      )}

      {favorites.length > 0 && isError && (
        <StateMessage.Error
          title="Greška pri učitavanju favorita"
          message="Nije moguće učitati spremljene proizvode."
          onRetry={refetch}
        />
      )}

      {favorites.length > 0 && !isLoading && !isError && (
        <>
          <p className={styles.resultsInfo} aria-live="polite">
            Prikazano {products.length} od {favorites.length} proizvoda
          </p>

          <ul className={styles.grid} aria-label="Lista favorita">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            label="Paginacija favorita"
          />
        </>
      )}
    </div>
  );
};

export default Favorites;
