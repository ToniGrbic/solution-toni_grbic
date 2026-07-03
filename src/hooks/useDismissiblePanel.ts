import { useEffect, type RefObject } from "react";

type UseDismissiblePanelOptions = {
  isOpen: boolean;
  onClose: () => void;
  containerRef?: RefObject<Element | null>;
  lockScroll?: boolean;
};

const useDismissiblePanel = ({
  isOpen,
  onClose,
  containerRef,
  lockScroll = false,
}: UseDismissiblePanelOptions) => {
  useEffect(() => {
    if (!isOpen) return;

    if (lockScroll) {
      document.body.style.overflow = "hidden";
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef?.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (containerRef) {
      document.addEventListener("pointerdown", onPointerDown);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (lockScroll) {
        document.body.style.overflow = "";
      }

      if (containerRef) {
        document.removeEventListener("pointerdown", onPointerDown);
      }

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, containerRef, lockScroll]);
};

export default useDismissiblePanel;
