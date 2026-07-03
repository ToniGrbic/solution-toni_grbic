import {
  PageHeader,
  Pagination,
  ProductCard,
  ProductGridSkeleton,
  StateMessage,
} from "@/components/common";
import { ProductFilters, ProductTable } from "@/components/products";
import { PAGE_SIZE } from "@/constants";
import { useProducts } from "@/hooks/api/useProducts";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import type { Product } from "@/types/product";
import clsx from "clsx";
import styles from "./Products.module.scss";
import { ViewMode } from "@/types/enums";

const Products = () => {
  useScrollRestoration();
  const { filters, setFilters } = useProductFilters();
  const { data, isLoading, isError, isFetching, refetch } =
    useProducts(filters);

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const showInitialLoading = isLoading && !data;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Proizvodi"
        subtitle="Pregledajte katalog proizvoda s filtriranjem i pretragom"
      />

      <ProductFilters filters={filters} onChange={setFilters} />

      {showInitialLoading && <ProductGridSkeleton />}

      {isError && <StateMessage.Error onRetry={refetch} />}

      {!showInitialLoading && !isError && products.length === 0 && (
        <StateMessage.Empty message="Nijedan proizvod ne odgovara odabranim filterima. Pokušajte promijeniti kriterije pretrage." />
      )}

      {!isError && products.length > 0 && (
        <>
          <p className={styles.resultsInfo} aria-live="polite">
            Prikazano {products.length} od {total} proizvoda
            {isFetching && !isLoading && " (ažuriranje…)"}
          </p>

          <div
            className={clsx(isFetching && !isLoading && styles.loadingOverlay)}
          >
            {filters.view === ViewMode.GRID ? (
              <ul className={styles.grid} aria-label="Lista proizvoda">
                {products.map((product: Product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <ProductTable products={products} />
            )}
          </div>

          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => setFilters({ page })}
            label="Paginacija proizvoda"
          />
        </>
      )}
    </div>
  );
};

export default Products;
