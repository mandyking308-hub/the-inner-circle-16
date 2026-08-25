import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Manual scroll-to-top is handled globally in src/routes/__root.tsx
    // (useScrollToTopOnNavigation) so that every route opens at the top on
    // desktop, tablet and mobile, including back/forward and refresh, while
    // still preserving intentional hash/anchor navigation.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
