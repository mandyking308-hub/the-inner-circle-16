import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * There is no member-facing supplier, partner or provider surface at Montvelle.
 * This legacy path exists only so old links land in the request-led route.
 */
export const Route = createFileRoute("/member/partners")({
  beforeLoad: () => {
    throw redirect({ to: "/member/services", replace: true });
  },
});
