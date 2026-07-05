import { Routes as AppRoutes } from "@/types/enums";
import type { RouteObject } from "react-router";
import { describe, expect, it } from "vitest";
import { router } from "./router.config";

const collectPaths = (routes: RouteObject[]): string[] =>
  routes.flatMap((route) => [
    ...(route.path ? [route.path] : []),
    ...(route.children ? collectPaths(route.children) : []),
  ]);

describe("Router", () => {
  it("implements all routes defined by AppRoutes", () => {
    const configuredPaths = collectPaths(router.routes);
    const expectedPaths = Object.values(AppRoutes);

    expectedPaths.forEach((path) => {
      expect(configuredPaths).toContain(path);
    });

    expect(configuredPaths).toHaveLength(expectedPaths.length);
  });
});
