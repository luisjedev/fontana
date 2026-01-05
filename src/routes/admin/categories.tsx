import { createFileRoute } from "@tanstack/react-router";
import { CategoriesView } from "@/features/admin/categories";

export const Route = createFileRoute("/admin/categories")({
	component: CategoriesView,
});
