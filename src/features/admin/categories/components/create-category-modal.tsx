import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useForm } from "@tanstack/react-form";

import { clsx } from "clsx";
import { useMutation } from "convex/react";
import { Check } from "lucide-react";
import { toast } from "sonner";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import type { Category } from "@/shared/types";
import {
	CATEGORY_COLORS,
	categorySchema,
	getCategoryDefaultValues,
} from "../hooks/use-category-form";

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
	const createCategory = useMutation(api.categories.create);
	const updateCategory = useMutation(api.categories.update);

	const defaultValues = getCategoryDefaultValues(category);

	const form = useForm({
		defaultValues,

		validators: {
			onChange: categorySchema,
		},
		onSubmit: async ({ value }) => {
			try {
				if (category) {
					await updateCategory({
						id: category._id as Id<"categories">,
						name: value.name,
						tax_percent: Number(value.taxPercent),
						tag_color: value.selectedColor,
						image: value.imageUrl || undefined,
					});
					toast.success("Categoría actualizada correctamente");
				} else {
					await createCategory({
						name: value.name,
						tax_percent: Number(value.taxPercent),
						tag_color: value.selectedColor,
						image: value.imageUrl || undefined,
					});
					toast.success("Categoría creada correctamente");
				}
				form.reset();
				onOpenChange(false);
			} catch (error) {
				toast.error(
					category
						? "Error al actualizar la categoría"
						: "Error al crear la categoría",
				);
				console.error(error);
			}
		},
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
									{isSubmitting ? "Guardando..." : "Guardar Categoría"}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</div>

				<div className="p-8 space-y-8 bg-white/50">
					<div className="grid grid-cols-2 gap-6">
						<form.Field name="name">
							{(field) => (
								<FormItem>
									<FormLabel error={!!field.state.meta.errors.length}>
										Nombre de la categoría
									</FormLabel>
									<div className="relative pt-2">
										<FormControl error={!!field.state.meta.errors.length}>
											<Input
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="e.j. Desayunos"
												className="text-lg px-4 bg-white"
											/>
										</FormControl>
									</div>
									<FormMessage>
										{field.state.meta.errors.join(", ")}
									</FormMessage>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="taxPercent">
							{(field) => (
								<FormItem>
									<FormLabel error={!!field.state.meta.errors.length}>
										Porcentaje de Impuesto
									</FormLabel>
									<div className="relative pt-2">
										<Select
											value={field.state.value}
											onValueChange={field.handleChange}
										>
											<FormControl error={!!field.state.meta.errors.length}>
												<SelectTrigger className="h-14 text-lg px-4 bg-white w-full">
													<SelectValue placeholder="Seleccionar %" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{TAX_OPTIONS.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<FormMessage>
										{field.state.meta.errors.join(", ")}
									</FormMessage>
								</FormItem>
							)}
						</form.Field>
					</div>

					<form.Field name="selectedColor">
						{(field) => (
							<FormItem>
								<FormLabel error={!!field.state.meta.errors.length}>
									Color de etiqueta
								</FormLabel>
								<div className="flex flex-wrap gap-4 pt-2">
									<FormControl error={!!field.state.meta.errors.length}>
										{/* Wrapper div acting as 'control' visually, though buttons are the inputs */}

										{CATEGORY_COLORS.map((color) => (
											<button
												key={color}
												type="button"
												onClick={() => field.handleChange(color)}
												className={clsx(
													"h-12 w-12 rounded-full border-2 transition-all",
													field.state.value === color
														? "border-blue-600 scale-110"
														: "border-transparent hover:scale-105",
												)}
												style={{ backgroundColor: color }}
												aria-label={`Select color ${color}`}
											/>
										))}
									</FormControl>
								</div>
								<FormMessage>
									{field.state.meta.errors
										.map((e: { message: string } | undefined) => e?.message)
										.join(", ")}
								</FormMessage>
							</FormItem>
						)}
					</form.Field>
				</div>
			</DialogContent>
		</Dialog>
	);
}
