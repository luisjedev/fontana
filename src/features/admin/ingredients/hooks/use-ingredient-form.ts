import { z } from "zod";
import type { Allergen, Ingredient } from "@/shared/types";

export const ingredientSchema = z.object({
	name: z.string().min(1, "El nombre es requerido"),
	allergensSelected: z.array(z.custom<Allergen>()),
});

export type IngredientFormValues = z.infer<typeof ingredientSchema>;

export const getIngredientDefaultValues = (
	ingredient: Ingredient | null | undefined,
	allergens: Allergen[],
): IngredientFormValues => {
	if (ingredient) {
		const selected = allergens.filter((a) =>
			ingredient.allergens?.includes(a._id),
		);
		return {
			name: ingredient.name,
			allergensSelected: selected,
		};
	}

	return {
		name: "",
		allergensSelected: [],
	};
};
