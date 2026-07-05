import { Skeleton } from "@/components/common";
import { SkeletonVariant } from "@/types/enums";
import styles from "./ProductDetailSkeleton.module.scss";

const ProductDetailSkeleton = () => (
  <div
    className={styles.detail}
    aria-busy="true"
    aria-label="Učitavanje proizvoda"
  >
    <Skeleton
      variant={SkeletonVariant.IMAGE}
      className={styles.detailImage}
    />
    <div className={styles.detailBody}>
      <Skeleton variant={SkeletonVariant.TEXT} className={styles.detailTitle} />
      <Skeleton variant={SkeletonVariant.TEXT} />
      <Skeleton variant={SkeletonVariant.TEXT} />
      <Skeleton variant={SkeletonVariant.TEXT} className={styles.short} />
    </div>
  </div>
);

export default ProductDetailSkeleton;
