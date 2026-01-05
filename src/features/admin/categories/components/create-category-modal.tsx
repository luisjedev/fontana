import { api } from "@convex/_generated/api";
import { clsx } from "clsx";
import { useMutation } from "convex/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

interface CreateCategoryModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category?: Category | null;
}

const CATEGORY_COLORS = [
	"#DBEAFE", // blue-100
	"#DCFCE7", // green-100
	"#FFEDD5", // orange-100
	"#F3E8FF", // purple-100
	"#FCE7F3", // pink-100
	"#FFE4E6", // rose-100
	"#FEF9C3", // yellow-100
];

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
	const [name, setName] = useState("");
	const [taxPercent, setTaxPercent] = useState("10");
	const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);
	const [imageUrl, setImageUrl] = useState("");

	const createCategory = useMutation(api.categories.create);
	const updateCategory = useMutation(api.categories.update);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (open) {
			if (category) {
				setName(category.name);
				setTaxPercent(category.tax_percent.toString());
				setSelectedColor(category.tag_color || CATEGORY_COLORS[0]);
				setImageUrl(category.image || "");
			} else {
				setName("");
				setTaxPercent("10");
				setSelectedColor(CATEGORY_COLORS[0]);
				setImageUrl("");
			}
		}
	}, [open, category]);

	const handleSave = async () => {
		if (!name.trim()) {
			toast.error("El nombre es requerido");
			return;
		}

		setIsSubmitting(true);
		try {
			if (category) {
				await updateCategory({
					id: category._id,
					name,
					tax_percent: Number(taxPercent),
					tag_color: selectedColor,
					image: imageUrl || undefined,
				});
				toast.success("Categoría actualizada correctamente");
			} else {
				await createCategory({
					name,
					tax_percent: Number(taxPercent),
					tag_color: selectedColor,
					image: imageUrl || undefined,
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
							onClick={handleSave}
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
									value={name}
									onChange={(e) => setName(e.target.value)}
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
								<Select value={taxPercent} onValueChange={setTaxPercent}>
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
									onClick={() => setSelectedColor(color)}
									className={clsx(
										"h-12 w-12 rounded-full border-2 transition-all",
										selectedColor === color
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
