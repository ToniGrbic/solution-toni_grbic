import Button from "@/components/common/Button";
import { useZoomInLens } from "@/hooks/useZoomInLens";
import clsx from "clsx";
import { useState } from "react";
import styles from "./ImageGallery.module.scss";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    mainImageRef,
    imgRef,
    lens,
    setLens,
    handleMouseMove,
    handleMouseLeave,
  } = useZoomInLens();

  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <div className={styles.gallery} role="region" aria-label="Galerija slika">
      <div
        ref={mainImageRef}
        className={styles.mainImage}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={activeImage}
          alt={title}
          width={800}
          height={600}
          onLoad={() => setLens((prev) => ({ ...prev, visible: false }))}
        />
        {lens.visible && (
          <div
            className={styles.zoomLens}
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundSize: `${lens.bgWidth}px ${lens.bgHeight}px`,
              backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
            }}
            aria-hidden
          />
        )}
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
              <img
                src={image}
                loading="lazy"
                width={72}
                height={54}
                alt={`${title} - slika ${index + 1}`}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
