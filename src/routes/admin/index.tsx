import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardView } from "@/features/admin/dashboard";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboardView,
});
