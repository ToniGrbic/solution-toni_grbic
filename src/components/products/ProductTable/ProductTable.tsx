import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthProvider";
import { useFavorites } from "@/hooks/useFavorites";
import { Routes } from "@/types/enums";
import type { Product } from "@/types/product";
import { formatPrice, saveScrollPosition, truncateText } from "@/utils/helpers";
import clsx from "clsx";
import { Link, useLocation } from "react-router";
import styles from "./ProductTable.module.scss";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

type ProductTableProps = {
  products: Product[];
};

const ProductTable = ({ products }: ProductTableProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={styles.wrapper}>
      <table className={styles.table} aria-label="Tablica proizvoda">
        <thead>
          <tr>
            <th scope="col">Slika</th>
            <th scope="col">Naziv</th>
            <th scope="col">Opis</th>
            <th scope="col">Cijena</th>
            {isAuthenticated && <th scope="col">Favorit</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const favorited = isFavorite(product.id);
            return (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.thumbnail}
                    alt=""
                    className={styles.thumb}
                    loading="lazy"
                    width={56}
                    height={42}
                  />
                </td>
                <td>
                  <Link
                    to={`${Routes.PRODUCTS}/${product.id}`}
                    state={{ from: location.pathname + location.search }}
                    className={styles.link}
                    onClick={saveScrollPosition}
                  >
                    {product.title}
                  </Link>
                </td>
                <td className={styles.description}>
                  {truncateText(product.description, 100)}
                </td>
                <td className={styles.price}>{formatPrice(product.price)}</td>
                {isAuthenticated && (
                  <td>
                    <Button
                      unstyled
                      type="button"
                      className={clsx(
                        styles.favorite,
                        favorited && styles.active,
                      )}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={
                        favorited
                          ? `Ukloni ${product.title} iz favorita`
                          : `Dodaj ${product.title} u favorite`
                      }
                      aria-pressed={favorited}
                    >
                      {favorited ? <IoHeart /> : <IoHeartOutline />}
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
