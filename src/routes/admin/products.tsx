import { createFileRoute } from "@tanstack/react-router";
import { ProductsView } from "@/features/admin/products";

export const Route = createFileRoute("/admin/products")({
	component: ProductsView,
});
