import { z } from "zod";
import type { Category } from "@/shared/types";

export const CATEGORY_COLORS = [
	"#DBEAFE", // blue-100
	"#DCFCE7", // green-100
	"#FFEDD5", // orange-100
	"#F3E8FF", // purple-100
	"#FCE7F3", // pink-100
	"#FFE4E6", // rose-100
	"#FEF9C3", // yellow-100
];

export const categorySchema = z.object({
	name: z.string().min(1, "El nombre es requerido"),
	taxPercent: z.string(), // We'll cast to number on submit
	selectedColor: z.string(),
	imageUrl: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const getCategoryDefaultValues = (
	category: Category | null | undefined,
): CategoryFormValues => {
	if (category) {
		return {
			name: category.name,
			taxPercent: category.tax_percent.toString(),
			selectedColor: category.tag_color || CATEGORY_COLORS[0],
			imageUrl: category.image || "",
		};
	}

	return {
		name: "",
		taxPercent: "10",
		selectedColor: CATEGORY_COLORS[0],
		imageUrl: "",
	};
};
