import { createFileRoute } from "@tanstack/react-router";
import { ContentAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/content")({ component: ContentAdminView });
