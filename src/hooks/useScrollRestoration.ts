import { useEffect } from "react";
import { restoreScrollPosition } from "@/utils/helpers";

export const useScrollRestoration = (): void => {
  useEffect(() => {
    restoreScrollPosition();
  }, []);
};
