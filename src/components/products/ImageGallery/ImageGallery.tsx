import Button from "@/components/common/Button";
import clsx from "clsx";
import { useState } from "react";
import styles from "./ImageGallery.module.scss";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <div className={styles.gallery} role="region" aria-label="Galerija slika">
      <div className={styles.mainImage}>
        <img src={activeImage} alt={title} width={800} height={600} />
      </div>

      {images.length > 1 && (
        <div
          className={styles.thumbnails}
          role="tablist"
          aria-label="Odabir slike"
        >
          {images.map((image, index) => (
            <Button
              key={image}
              unstyled
              role="tab"
              className={clsx(
                styles.thumb,
                index === activeIndex && styles.active,
              )}
              aria-selected={index === activeIndex}
              aria-label={`Slika ${index + 1} od ${images.length}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={image} alt="" loading="lazy" width={72} height={54} />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
