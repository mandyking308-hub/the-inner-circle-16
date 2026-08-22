import { createFileRoute } from "@tanstack/react-router";
import { EventsAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/events")({ component: EventsAdminView });
