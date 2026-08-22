import { createFileRoute } from "@tanstack/react-router";
import { NextGenAdminView } from "@/components/admin/AdminViews";
export const Route = createFileRoute("/admin/next-gen")({ component: NextGenAdminView });
