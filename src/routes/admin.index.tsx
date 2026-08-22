import { createFileRoute } from "@tanstack/react-router";
import { AdminOverview } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/")({ component: AdminOverview });
