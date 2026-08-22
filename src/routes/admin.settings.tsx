import { createFileRoute } from "@tanstack/react-router";
import { SettingsAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/settings")({ component: SettingsAdminView });
