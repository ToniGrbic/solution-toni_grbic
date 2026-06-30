import { ProductGridSkeleton, StateMessage } from "@/components/common";
import ProductCard from "@/components/products/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useFavoriteProducts } from "@/hooks/useProducts";
import styles from "./index.module.scss";

const Favorites = () => {
  const { favorites } = useFavorites();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useFavoriteProducts(favorites);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Favoriti</h1>
        <p className={styles.subtitle}>
          Vaši spremljeni proizvodi ({favorites.length})
        </p>
      </header>

      {favorites.length === 0 && (
        <StateMessage.Empty
          title="Nema favorita"
          message="Dodajte proizvode u favorite s liste proizvoda klikom na ikonu srca."
        />
      )}

      {favorites.length > 0 && isLoading && <ProductGridSkeleton count={4} />}

      {favorites.length > 0 && isError && (
        <StateMessage.Error
          title="Greška pri učitavanju favorita"
          message="Nije moguće učitati spremljene proizvode."
          onRetry={refetch}
        />
      )}

      {favorites.length > 0 && !isLoading && !isError && (
        <ul className={styles.grid} aria-label="Lista favorita">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
