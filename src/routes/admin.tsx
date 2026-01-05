import { createFileRoute } from "@tanstack/react-router";
import { AdminView } from "@/features/admin";

export const Route = createFileRoute("/admin")({
	component: AdminView,
});
