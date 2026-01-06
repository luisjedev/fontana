import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Allergen, Ingredient } from "@/shared/types";

interface IngredientFormState {
	name: string;
	allergensSelected: Allergen[];
}

const INITIAL_STATE: IngredientFormState = {
	name: "",
	allergensSelected: [],
};

interface UseIngredientFormProps {
	ingredient?: Ingredient | null;
	allergens: Allergen[];
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function useIngredientForm({
	ingredient,
	allergens,
	onOpenChange,
	open,
}: UseIngredientFormProps) {
	const [formState, setFormState] =
		useState<IngredientFormState>(INITIAL_STATE);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createIngredient = useMutation(api.ingredients.create);
	const updateIngredient = useMutation(api.ingredients.update);

	useEffect(() => {
		if (open) {
			if (ingredient) {
				const selected = allergens.filter((a) =>
					ingredient.allergens?.includes(a._id),
				);
				setFormState({
					name: ingredient.name,
					allergensSelected: selected,
				});
			} else {
				setFormState(INITIAL_STATE);
			}
		}
	}, [open, ingredient, allergens]);

	const handleSubmit = async () => {
		if (!formState.name.trim()) {
			toast.error("El nombre es requerido");
			return;
		}

		setIsSubmitting(true);
		try {
			if (ingredient) {
				await updateIngredient({
					id: ingredient._id as Id<"ingredients">,
					name: formState.name,
					allergens: formState.allergensSelected.map((a) => a._id),
				});
				toast.success("Ingrediente actualizado correctamente");
			} else {
				await createIngredient({
					name: formState.name,
					allergens: formState.allergensSelected.map((a) => a._id),
				});
				toast.success("Ingrediente creado correctamente");
			}
			onOpenChange(false);
		} catch (error) {
			toast.error(
				ingredient
					? "Error al actualizar el ingrediente"
					: "Error al crear el ingrediente",
			);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setField = <K extends keyof IngredientFormState>(
		field: K,
		value: IngredientFormState[K],
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
