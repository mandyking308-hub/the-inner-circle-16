import { createFileRoute } from "@tanstack/react-router";
import { MembersAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/members")({ component: MembersAdminView });
