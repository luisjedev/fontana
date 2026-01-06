import { Check, Pencil } from "lucide-react";
import { AllergenSelector } from "@/features/admin/ingredients/components/allergen-selector";
import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import type { Allergen, Ingredient } from "@/shared/types";
import { useIngredientForm } from "../hooks/use-ingredient-form";

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
	const { formState, setField, handleSubmit, isSubmitting } = useIngredientForm(
		{
			open,
			onOpenChange,
			allergens,
			ingredient,
		},
	);

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
						<Button
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 p-6"
							onClick={handleSubmit}
							disabled={isSubmitting}
						>
							<Check className="h-4 w-4" strokeWidth={2} />
							{isSubmitting ? "Guardando..." : "Guardar"}
						</Button>
					</div>
				</div>

				<div className="p-8 space-y-8 bg-white/50">
					<div className="space-y-4">
						<span className="text-sm font-semibold text-foreground">
							Nombre del ingrediente
						</span>
						<div className="relative pt-2">
							<Input
								value={formState.name}
								onChange={(e) => setField("name", e.target.value)}
								placeholder="e.j Cebolla crujiente"
								className="h-14 text-lg px-4 bg-white"
							/>
							<Pencil className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						</div>
					</div>
					<AllergenSelector
						allergens={allergens}
						value={formState.allergensSelected}
						onChange={(val) => setField("allergensSelected", val)}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
