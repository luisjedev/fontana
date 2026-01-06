import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

interface CategoryFormState {
	name: string;
	taxPercent: string;
	selectedColor: string;
	imageUrl: string;
}

const INITIAL_STATE: CategoryFormState = {
	name: "",
	taxPercent: "10",
	selectedColor: CATEGORY_COLORS[0],
	imageUrl: "",
};

interface UseCategoryFormProps {
	category?: Category | null;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function useCategoryForm({
	category,
	onOpenChange,
	open,
}: UseCategoryFormProps) {
	const [formState, setFormState] = useState<CategoryFormState>(INITIAL_STATE);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createCategory = useMutation(api.categories.create);
	const updateCategory = useMutation(api.categories.update);

	useEffect(() => {
		if (open) {
			if (category) {
				setFormState({
					name: category.name,
					taxPercent: category.tax_percent.toString(),
					selectedColor: category.tag_color || CATEGORY_COLORS[0],
					imageUrl: category.image || "",
				});
			} else {
				setFormState(INITIAL_STATE);
			}
		}
	}, [open, category]);

	const handleSubmit = async () => {
		if (!formState.name.trim()) {
			toast.error("El nombre es requerido");
			return;
		}

		setIsSubmitting(true);
		try {
			if (category) {
				await updateCategory({
					id: category._id as Id<"categories">,
					name: formState.name,
					tax_percent: Number(formState.taxPercent),
					tag_color: formState.selectedColor,
					image: formState.imageUrl || undefined,
				});
				toast.success("Categoría actualizada correctamente");
			} else {
				await createCategory({
					name: formState.name,
					tax_percent: Number(formState.taxPercent),
					tag_color: formState.selectedColor,
					image: formState.imageUrl || undefined,
				});
				toast.success("Categoría creada correctamente");
			}
			onOpenChange(false);
		} catch (error) {
			toast.error(
				category
					? "Error al actualizar la categoría"
					: "Error al crear la categoría",
			);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setField = <K extends keyof CategoryFormState>(
		field: K,
		value: CategoryFormState[K],
	) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	return {
		formState,
		setField,
		handleSubmit,
		isSubmitting,
	};
}
