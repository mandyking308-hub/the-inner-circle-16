import { createFileRoute } from "@tanstack/react-router";
import { ImpactAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/impact")({ component: ImpactAdminView });
