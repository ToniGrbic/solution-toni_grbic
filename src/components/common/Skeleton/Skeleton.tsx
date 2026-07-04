import { SkeletonVariant } from "@/types/enums";
import clsx from "clsx";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

interface ProductGridSkeletonProps {
  count?: number;
}

export const Skeleton = ({
  className,
  variant = SkeletonVariant.TEXT,
}: SkeletonProps) => (
  <div
    className={clsx(styles.skeleton, styles[variant], className)}
    aria-hidden="true"
  />
);

export const ProductCardSkeleton = () => (
  <article className={styles.card} aria-hidden="true">
    <Skeleton variant={SkeletonVariant.IMAGE} />
    <div className={styles.cardBody}>
      <Skeleton variant={SkeletonVariant.TITLE} />
      <Skeleton variant={SkeletonVariant.TEXT} />
      <Skeleton variant={SkeletonVariant.TEXT} className={styles.short} />
    </div>
  </article>
);

export const ProductGridSkeleton = ({ count = 8 }: ProductGridSkeletonProps) => (
  <div
    className={styles.grid}
    aria-busy="true"
    aria-label="Učitavanje proizvoda"
  >
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default Skeleton;
