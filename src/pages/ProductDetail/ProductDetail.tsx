import { Button, StateMessage } from "@/components/common";
import ImageGallery from "@/components/products/ImageGallery";
import { useAuth } from "@/context/AuthProvider";
import { useProduct } from "@/hooks/api/useProduct";
import { useFavorites } from "@/hooks/useFavorites";
import { ButtonVariant, Routes } from "@/types/enums";
import { formatPrice } from "@/utils/helpers";
import clsx from "clsx";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";

const getStockStatus = (stock: number) => {
  if (stock <= 0)
    return { label: "Nema na zalihi", className: styles.outOfStock };
  if (stock < 10)
    return { label: `Malo zaliha (${stock})`, className: styles.lowStock };
  return { label: `Na zalihi (${stock})`, className: styles.inStock };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: product, isLoading, isError, refetch } = useProduct(productId);

  const backUrl =
    (location.state as { from?: string } | null)?.from ?? Routes.PRODUCTS;

  if (isLoading) {
    return (
      <div
        className={styles.page}
        aria-busy="true"
        aria-label="Učitavanje proizvoda"
      >
        <div className={styles.skeletonDetail}>
          <div className={styles.skeletonImage} />
          <div>
            <div className={clsx(styles.skeletonText, styles.wide)} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
            <div className={clsx(styles.skeletonText, styles.short)} />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.page}>
        <StateMessage.Error
          title="Proizvod nije pronađen"
          message={"Traženi proizvod ne postoji ili nije dostupan."}
          onRetry={refetch}
        />
        <Link to={backUrl}>
          <Button variant={ButtonVariant.SECONDARY}>← Natrag na listu</Button>
        </Link>
      </div>
    );
  }

  const stock = getStockStatus(product.stock);
  const favorited = isFavorite(product.id);

  const handleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <article className={styles.page}>
      <Link to={backUrl} className={styles.back}>
        <Button variant={ButtonVariant.GHOST}>← Natrag na listu</Button>
      </Link>

      <div className={styles.layout}>
        <ImageGallery images={product.images} title={product.title} />

        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.meta}>
            <span className={styles.badge}>★ {product.rating.toFixed(1)}</span>
            <span className={styles.badge}>
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </span>
            <span className={clsx(styles.badge, styles.stock, stock.className)}>
              {stock.label}
            </span>
          </div>

          <p className={styles.price}>{formatPrice(product.price)}</p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            {isAuthenticated && (
              <Button
                variant={
                  favorited ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY
                }
                onClick={handleFavorite}
                aria-pressed={favorited}
              >
                {favorited ? "♥ U favoritima" : "♡ Dodaj u favorite"}
              </Button>
            )}
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={() => navigate(backUrl)}
            >
              Povratak
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
