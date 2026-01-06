import { z } from "zod";
import type { Ingredient, Product } from "@/shared/types";

export const productSchema = z.object({
	name: z.string().min(1, "El nombre es requerido"),
	price: z.string().min(1, "El precio es requerido"),
	categoryId: z.string().min(1, "La categoría es requerida"),
	type: z.enum(["product", "addon", "note"]),
	imageUrl: z.string().optional(),
	selectedIngredients: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
		}),
	),
	linkedIngredientId: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const getProductDefaultValues = (
	product: Product | null | undefined,
	ingredients: Ingredient[],
): ProductFormValues => {
	if (!product) {
		return {
			name: "",
			price: "0",
			categoryId: "",
			type: "product",
			selectedIngredients: [],
			imageUrl: "",
			linkedIngredientId: undefined,
		};
	}

	const selectedIngredients =
		product.elementType === "product" && product.ingredients
			? product.ingredients.map((pi) => {
					const ing = ingredients.find((i) => i._id === pi.id);
					return { id: pi.id, name: ing?.name || "Unknown" };
				})
			: [];

	let linkedIngredientId: string | undefined;
	if (
		product.elementType === "addon" &&
		product.ingredients &&
		product.ingredients.length > 0
	) {
		linkedIngredientId = product.ingredients[0].id;
	}

	return {
		name: product.name,
		price: product.price.toString(),
		categoryId: product.categoryId,
		type: product.elementType as "product" | "addon" | "note",
		imageUrl: product.image,
		selectedIngredients,
		linkedIngredientId,
	};
};
