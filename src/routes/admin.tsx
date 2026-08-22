import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PrivateShell } from "@/components/private/PrivateShell";
import { site } from "@/config/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Concierge & operations — ${site.name}` },
      { name: "description", content: `Administration area for ${site.name}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <PrivateShell mode="admin">
      <Outlet />
    </PrivateShell>
  );
}
