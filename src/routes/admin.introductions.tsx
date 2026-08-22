import { createFileRoute } from "@tanstack/react-router";
import { IntroductionsAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/introductions")({ component: IntroductionsAdminView });
