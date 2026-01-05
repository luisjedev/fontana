import { createFileRoute } from "@tanstack/react-router";
import { IngredientsView } from "@/features/admin/ingredients";

export const Route = createFileRoute("/admin/ingredients")({
	component: IngredientsView,
});
