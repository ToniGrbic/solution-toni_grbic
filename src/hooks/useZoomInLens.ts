import { useCallback, useRef, useState } from "react";

const LENS_WIDTH = 200;
const LENS_HEIGHT = 100;
const ZOOM_FACTOR = 2;

type LensState = {
  visible: boolean;
  bgX: number;
  bgY: number;
  bgWidth: number;
  bgHeight: number;
};

export const useZoomInLens = () => {
  const mainImageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [lens, setLens] = useState<LensState>({
    visible: false,
    bgX: 0,
    bgY: 0,
    bgWidth: 0,
    bgHeight: 0,
  });

  const getRenderedImageBounds = useCallback(() => {
    const container = mainImageRef.current;
    const img = imgRef.current;
    if (!container || !img || !img.naturalWidth) return null;

    const { width: containerWidth, height: containerHeight } =
      container.getBoundingClientRect();
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = containerWidth / containerHeight;

    let renderedWidth: number;
    let renderedHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (imgRatio > containerRatio) {
      renderedWidth = containerWidth;
      renderedHeight = containerWidth / imgRatio;
      offsetX = 0;
      offsetY = (containerHeight - renderedHeight) / 2;
    } else {
      renderedHeight = containerHeight;
      renderedWidth = containerHeight * imgRatio;
      offsetX = (containerWidth - renderedWidth) / 2;
      offsetY = 0;
    }

    return { renderedWidth, renderedHeight, offsetX, offsetY };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const container = mainImageRef.current;
      const bounds = getRenderedImageBounds();
      if (!container || !bounds) return;

      const rect = container.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const { renderedWidth, renderedHeight, offsetX, offsetY } = bounds;

      const imageX = localX - offsetX;
      const imageY = localY - offsetY;

      if (
        imageX < 0 ||
        imageY < 0 ||
        imageX > renderedWidth ||
        imageY > renderedHeight
      ) {
        setLens((prev) => ({ ...prev, visible: false }));
        return;
      }

      setLens({
        visible: true,
        bgX: -(imageX * ZOOM_FACTOR - LENS_WIDTH / 2),
        bgY: -(imageY * ZOOM_FACTOR - LENS_HEIGHT / 2),
        bgWidth: renderedWidth * ZOOM_FACTOR,
        bgHeight: renderedHeight * ZOOM_FACTOR,
      });
    },
    [getRenderedImageBounds],
  );

  const handleMouseLeave = useCallback(() => {
    setLens((prev) => ({ ...prev, visible: false }));
  }, []);

  return {
    mainImageRef,
    imgRef,
    lens,
    setLens,
    handleMouseMove,
    handleMouseLeave,
  };
};
