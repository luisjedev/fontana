import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { Check, Pencil } from "lucide-react";
import { toast } from "sonner";
import { AllergenSelector } from "@/features/admin/ingredients/components/allergen-selector";
import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { formatFieldErrors } from "@/shared/lib/utils";
import type { Allergen, Ingredient } from "@/shared/types";
import {
	getIngredientDefaultValues,
	ingredientSchema,
} from "../hooks/use-ingredient-form";

interface CreateIngredientModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	allergens: Allergen[];
	ingredient?: Ingredient | null;
}

export function CreateIngredientModal({
	open,
	onOpenChange,
	allergens,
	ingredient,
}: CreateIngredientModalProps) {
	const createIngredient = useMutation(api.ingredients.create);
	const updateIngredient = useMutation(api.ingredients.update);
	const form = useForm({
		defaultValues: getIngredientDefaultValues(ingredient, allergens),
		validators: {
			onChange: ingredientSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				if (ingredient) {
					await updateIngredient({
						id: ingredient._id as Id<"ingredients">,
						name: value.name,
						allergens: value.allergensSelected.map(
							(a) => a._id as Id<"allergens">,
						),
					});
					toast.success("Ingrediente actualizado correctamente");
				} else {
					await createIngredient({
						name: value.name,
						allergens: value.allergensSelected.map(
							(a) => a._id as Id<"allergens">,
						),
					});
					toast.success("Ingrediente creado correctamente");
				}
				form.reset();
				onOpenChange(false);
			} catch (error) {
				toast.error(
					ingredient
						? "Error al actualizar el ingrediente"
						: "Error al crear el ingrediente",
				);
				console.error(error);
			}
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-4xl p-0 gap-0 overflow-hidden w-full">
				<div className="flex items-center justify-between p-6 bg-white border-b">
					<div className="space-y-1">
						<DialogTitle className="text-2xl font-bold">
							{ingredient ? "Editar ingrediente" : "Nuevo ingrediente"}
						</DialogTitle>
						<DialogDescription className="text-base">
							{ingredient
								? "Modifica los detalles del ingrediente."
								: "Agrega un ingrediente básico a tu inventario."}
						</DialogDescription>
					</div>
					<div className="flex items-center gap-3 pt-6">
						<Button
							variant="outline"
							className="p-6"
							onClick={() => onOpenChange(false)}
						>
							Cancelar
						</Button>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 p-6"
									onClick={() => {
										void form.handleSubmit();
									}}
									disabled={!canSubmit}
								>
									<Check className="h-4 w-4" strokeWidth={2} />
									{isSubmitting ? "Guardando..." : "Guardar"}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</div>

				<div className="p-8 space-y-8 bg-white/50">
					<form.Field name="name">
						{(field) => (
							<FormItem>
								<FormLabel error={!!field.state.meta.errors.length}>
									Nombre del ingrediente
								</FormLabel>
								<div className="relative pt-2">
									<FormControl error={!!field.state.meta.errors.length}>
										<Input
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="e.j Cebolla crujiente"
											className="h-14 text-lg px-4 bg-white"
										/>
									</FormControl>
									<Pencil className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
								</div>
								<FormMessage>
									{formatFieldErrors(field.state.meta.errors)}
								</FormMessage>
							</FormItem>
						)}
					</form.Field>

					<form.Field name="allergensSelected">
						{(field) => (
							<FormItem>
								<FormControl>
									<AllergenSelector
										allergens={allergens}
										value={field.state.value}
										onChange={field.handleChange}
									/>
								</FormControl>
								<FormMessage>
									{formatFieldErrors(field.state.meta.errors)}
								</FormMessage>
							</FormItem>
						)}
					</form.Field>
				</div>
			</DialogContent>
		</Dialog>
	);
}
