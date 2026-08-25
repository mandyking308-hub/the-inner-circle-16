import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PrivateShell } from "@/components/private/PrivateShell";
import { PrivatePreviewGate } from "@/components/security/PrivatePreviewGate";
import { site } from "@/config/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Concierge & operations — ${site.name}` },
      { name: "description", content: `Administration area for ${site.name}.` },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <PrivatePreviewGate>
      <PrivateShell mode="admin">
        <Outlet />
      </PrivateShell>
    </PrivatePreviewGate>
  );
}
