import { createFileRoute } from "@tanstack/react-router";
import { TablesAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/tables")({ component: TablesAdminView });
