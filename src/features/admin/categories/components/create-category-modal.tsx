import { clsx } from "clsx";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import type { Category } from "@/shared/types";
import { CATEGORY_COLORS, useCategoryForm } from "../hooks/use-category-form";

interface CreateCategoryModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category?: Category | null;
}

const TAX_OPTIONS = [
	{ value: "0", label: "0%" },
	{ value: "4", label: "4%" },
	{ value: "10", label: "10%" },
	{ value: "21", label: "21%" },
];

export function CreateCategoryModal({
	open,
	onOpenChange,
	category,
}: CreateCategoryModalProps) {
	const { formState, setField, handleSubmit, isSubmitting } = useCategoryForm({
		open,
		onOpenChange,
		category,
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden w-full">
				<div className="flex items-center justify-between p-6 bg-white border-b">
					<div className="space-y-1">
						<DialogTitle className="text-2xl font-bold">
							{category ? "Editar categoría" : "Nueva categoría"}
						</DialogTitle>
						<DialogDescription className="text-base">
							{category
								? "Modifica los detalles de la categoría."
								: "Agrega una nueva categoría para tus productos."}
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
							{isSubmitting ? "Guardando..." : "Guardar Categoría"}
						</Button>
					</div>
				</div>

				<div className="p-8 space-y-8 bg-white/50">
					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-4">
							<span className="text-sm font-semibold text-foreground">
								Nombre de la categoría
							</span>
							<div className="relative pt-2">
								<Input
									value={formState.name}
									onChange={(e) => setField("name", e.target.value)}
									placeholder="e.j. Desayunos"
									className="text-lg px-4 bg-white"
								/>
							</div>
						</div>
						<div className="space-y-4">
							<span className="text-sm font-semibold text-foreground">
								Porcentaje de Impuesto
							</span>
							<div className="relative pt-2">
								<Select
									value={formState.taxPercent}
									onValueChange={(value) => setField("taxPercent", value)}
								>
									<SelectTrigger className="h-14 text-lg px-4 bg-white w-full">
										<SelectValue placeholder="Seleccionar %" />
									</SelectTrigger>
									<SelectContent>
										{TAX_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<span className="text-sm font-semibold text-foreground">
							Color de etiqueta
						</span>
						<div className="flex flex-wrap gap-4 pt-2">
							{CATEGORY_COLORS.map((color) => (
								<button
									key={color}
									type="button"
									onClick={() => setField("selectedColor", color)}
									className={clsx(
										"h-12 w-12 rounded-full border-2 transition-all",
										formState.selectedColor === color
											? "border-blue-600 scale-110"
											: "border-transparent hover:scale-105",
									)}
									style={{ backgroundColor: color }}
									aria-label={`Select color ${color}`}
								/>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
