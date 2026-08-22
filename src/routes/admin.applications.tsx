import { createFileRoute } from "@tanstack/react-router";
import { ApplicationsView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/applications")({ component: ApplicationsView });
