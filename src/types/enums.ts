enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  GHOST = "ghost",
}

enum Routes {
  HOME = "/",
  PRODUCTS = "/products",
  PRODUCT_DETAIL = "/products/:id",
  LOGIN = "/login",
  FAVORITES = "/favorites",
  NOT_FOUND = "*",
}

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

enum StateMessageVariant {
  DEFAULT = "default",
  ERROR = "error",
}

enum SkeletonVariant {
  TEXT = "text",
  TITLE = "title",
  IMAGE = "image",
}

export { ButtonVariant, Routes, SkeletonVariant, StateMessageVariant, Theme };
