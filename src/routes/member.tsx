import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PrivateShell } from "@/components/private/PrivateShell";
import { PrivatePreviewGate } from "@/components/security/PrivatePreviewGate";
import { site } from "@/config/site";

export const Route = createFileRoute("/member")({
  head: () => ({
    meta: [
      { title: `Member area — ${site.name}` },
      { name: "description", content: `The private member area of ${site.name}.` },
    ],
  }),
  component: MemberLayout,
});

function MemberLayout() {
  return (
    <PrivatePreviewGate scope="member">
      <PrivateShell mode="member">
        <Outlet />
      </PrivateShell>
    </PrivatePreviewGate>
  );
}
