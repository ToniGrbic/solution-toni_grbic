import { Button } from "@/components/common";
import { useAuth } from "@/context/AuthProvider";
import { useFavorites } from "@/hooks/useFavorites";
import { Routes } from "@/types/enums";
import type { Product } from "@/types/product";
import { formatPrice, saveScrollPosition, truncateText } from "@/utils/helpers";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleFavorite = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isAuthenticated) {
      toggleFavorite(product.id);
    }
  };

  return (
    <article className={styles.card}>
      <Link
        to={`${Routes.PRODUCTS}/${product.id}`}
        state={{ from: location.pathname + location.search }}
        className={styles.link}
        viewTransition
        prefetch="intent"
        onClick={saveScrollPosition}
        aria-label={`Pogledaj detalje: ${product.title}`}
      >
        <div className={styles.imageWrap}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
            loading="lazy"
            width={300}
            height={225}
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.description}>
            {truncateText(product.description, 100)}
          </p>
          <div className={styles.footer}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {isAuthenticated && (
              <Button
                unstyled
                type="button"
                className={clsx(styles.favorite, favorited && styles.active)}
                onClick={handleFavorite}
                aria-label={
                  favorited
                    ? `Ukloni ${product.title} iz favorita`
                    : `Dodaj ${product.title} u favorite`
                }
                aria-pressed={favorited}
              >
                {favorited ? <IoHeart /> : <IoHeartOutline />}
              </Button>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
