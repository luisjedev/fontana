import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Category, Ingredient, Product } from "@/shared/types";

type ProductType = "product" | "addon" | "note";

interface ProductFormState {
	name: string;
	price: string;
	categoryId: string;
	type: ProductType;
	imageUrl: string;
	selectedIngredients: { id: string; name: string }[];
	linkedIngredientId: string;
}

const INITIAL_STATE: ProductFormState = {
	name: "",
	price: "0",
	categoryId: "",
	type: "product",
	imageUrl: "",
	selectedIngredients: [],
	linkedIngredientId: "",
};

interface UseProductFormProps {
	product?: Product | null;
	categories: Category[];
	ingredients: Ingredient[];
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function useProductForm({
	product,
	ingredients,
	onOpenChange,
	open,
}: UseProductFormProps) {
	const [formState, setFormState] = useState<ProductFormState>(INITIAL_STATE);
	const [ingredientSearch, setIngredientSearch] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createProduct = useMutation(api.products.create);
	const updateProduct = useMutation(api.products.update);

	useEffect(() => {
		if (open) {
			if (product) {
				const state: ProductFormState = {
					name: product.name,
					price: product.price.toString(),
					categoryId: product.categoryId,
					type: product.elementType as ProductType,
					imageUrl: product.image || "",
					selectedIngredients: [],
					linkedIngredientId: "",
				};

				if (product.elementType === "product" && product.ingredients) {
					state.selectedIngredients = product.ingredients.map((pi) => {
						const ing = ingredients.find((i) => i._id === pi.id);
						return { id: pi.id, name: ing?.name || "Unknown" };
					});
				}

				if (
					product.elementType === "addon" &&
					product.ingredients &&
					product.ingredients.length > 0
				) {
					state.linkedIngredientId = product.ingredients[0].id;
				}

				setFormState(state);
			} else {
				setFormState(INITIAL_STATE);
			}
			setIngredientSearch("");
		}
	}, [open, product, ingredients]);

	const handleSubmit = async () => {
		if (!formState.name.trim()) {
			toast.error("El nombre es requerido");
			return;
		}
		if (!formState.categoryId) {
			toast.error("La categoría es requerida");
			return;
		}

		let finalIngredients: { id: Id<"ingredients">; quantity: number }[] = [];

		if (formState.type === "product") {
			finalIngredients = formState.selectedIngredients.map((i) => ({
				id: i.id as Id<"ingredients">,
				quantity: 1,
			}));
		} else if (formState.type === "addon") {
			if (formState.linkedIngredientId) {
				finalIngredients = [
					{
						id: formState.linkedIngredientId as Id<"ingredients">,
						quantity: 1,
					},
				];
			}
		}

		setIsSubmitting(true);
		try {
			const payload = {
				name: formState.name,
				price: Number(formState.price),
				categoryId: formState.categoryId as Id<"categories">,
				elementType: formState.type,
				image: formState.imageUrl || undefined,
				ingredients: finalIngredients.length > 0 ? finalIngredients : undefined,
				isActive: true,
			};

			if (product) {
				await updateProduct({
					id: product._id as Id<"products">,
					...payload,
				});
				toast.success("Producto actualizado correctamente");
			} else {
				await createProduct(payload);
				toast.success("Producto creado correctamente");
			}
			onOpenChange(false);
		} catch (error) {
			toast.error(
				product
					? "Error al actualizar el producto"
					: "Error al crear el producto",
			);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setField = <K extends keyof ProductFormState>(
		field: K,
		value: ProductFormState[K],
	) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	// Helper actions
	const addIngredient = (ing: Ingredient) => {
		setField("selectedIngredients", [
			...formState.selectedIngredients,
			{ id: ing._id, name: ing.name },
		]);
		setIngredientSearch("");
	};

	const removeIngredient = (id: string) => {
		setField(
			"selectedIngredients",
			formState.selectedIngredients.filter((i) => i.id !== id),
		);
	};

	const selectAddonIngredient = (ing: Ingredient) => {
		setField("linkedIngredientId", ing._id);
		setField("name", ing.name);
		setIngredientSearch("");
	};

	const removeAddonIngredient = () => {
		setField("linkedIngredientId", "");
		setField("name", "");
	};

	// Filtering logic for the UI
	const filteredIngredients = ingredients.filter(
		(i) =>
			i.name.toLowerCase().includes(ingredientSearch.toLowerCase()) &&
			!formState.selectedIngredients.some((si) => si.id === i._id),
	);

	const filteredAddonIngredients = ingredients.filter((i) =>
		i.name.toLowerCase().includes(ingredientSearch.toLowerCase()),
	);

	return {
		formState,
		setField,
		ingredientSearch,
		setIngredientSearch,
		isSubmitting,
		handleSubmit,
		// Helpers
		addIngredient,
		removeIngredient,
		selectAddonIngredient,
		removeAddonIngredient,
		// Computed
		filteredIngredients,
		filteredAddonIngredients,
	};
}
