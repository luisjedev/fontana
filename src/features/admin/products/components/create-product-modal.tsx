import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useForm, useStore } from "@tanstack/react-form";
import { clsx } from "clsx";
import { useMutation } from "convex/react";
import { Check, X } from "lucide-react";
import { useState } from "react";
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
import { formatFieldErrors } from "@/shared/lib/utils";
import type { Category, Ingredient, Product } from "@/shared/types";
import {
	getProductDefaultValues,
	productSchema,
} from "../hooks/use-product-form";

const TYPE_LABELS: Record<"product" | "addon" | "note", string> = {
	product: "Producto",
	addon: "Extra",
	note: "Nota",
};

interface CreateProductModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	product?: Product | null;
	categories: Category[];
	ingredients: Ingredient[];
}

export function CreateProductModal({
	open,
	onOpenChange,
	product,
	categories,
	ingredients,
}: CreateProductModalProps) {
	const createProduct = useMutation(api.products.create);
	const updateProduct = useMutation(api.products.update);
	const [ingredientSearch, setIngredientSearch] = useState("");

	// Memeize default values to prevent unstable form instance if that logic exists, and for effect deps
	const defaultValues = getProductDefaultValues(product, ingredients);

	const form = useForm({
		defaultValues,

		validators: {
			onChange: productSchema,
		},
		onSubmit: async ({ value }) => {
			let finalIngredients: { id: Id<"ingredients">; quantity: number }[] = [];

			if (value.type === "product") {
				finalIngredients = value.selectedIngredients.map((i) => ({
					id: i.id as Id<"ingredients">,
					quantity: 1,
				}));
			} else if (value.type === "addon") {
				if (value.linkedIngredientId) {
					finalIngredients = [
						{
							id: value.linkedIngredientId as Id<"ingredients">,
							quantity: 1,
						},
					];
				}
			}

			try {
				const payload = {
					name: value.name,
					price: Number(value.price),
					categoryId: value.categoryId as Id<"categories">,
					elementType: value.type,
					image: value.imageUrl || undefined,
					ingredients:
						finalIngredients.length > 0 ? finalIngredients : undefined,
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
				form.reset();
				onOpenChange(false);
			} catch (error) {
				toast.error(
					product
						? "Error al actualizar el producto"
						: "Error al crear el producto",
				);
				console.error(error);
			}
		},
	});

	// Reactive values from the form store
	const type = useStore(form.store, (state) => state.values.type);
	const selectedIngredients = useStore(
		form.store,
		(state) => state.values.selectedIngredients,
	);
	const linkedIngredientId = useStore(
		form.store,
		(state) => state.values.linkedIngredientId,
	);

	// Filtering logic
	const filteredIngredients = ingredients.filter(
		(i) =>
			i.name.toLowerCase().includes(ingredientSearch.toLowerCase()) &&
			!selectedIngredients.some((si: { id: string }) => si.id === i._id),
	);

	const filteredAddonIngredients = ingredients.filter((i) =>
		i.name.toLowerCase().includes(ingredientSearch.toLowerCase()),
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="sm:max-w-2xl p-0 gap-0 overflow-hidden w-full h-[90vh] flex flex-col"
				aria-describedby={undefined}
			>
				<div className="flex items-center justify-between p-6 bg-white border-b shrink-0">
					<div className="space-y-1">
						<DialogTitle className="text-2xl font-bold">
							{product ? "Editar Producto" : "Nuevo Producto"}
						</DialogTitle>
						<DialogDescription className="text-base">
							Rellena la información para crear una nueva entrada de producto.
						</DialogDescription>
					</div>
					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							className="px-6 py-4"
							onClick={() => onOpenChange(false)}
						>
							Cancelar
						</Button>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 px-6 py-4"
									onClick={() => {
										void form.handleSubmit();
									}}
									disabled={!canSubmit}
								>
									<Check className="h-4 w-4" strokeWidth={2} />
									{isSubmitting ? "Guardando..." : "Guardar Producto"}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
					<div className="gap-8">
						<div className="space-y-8">
							<div className="grid grid-cols-2 gap-6">
								<form.Field name="categoryId">
									{(field) => (
										<FormItem>
											<FormLabel error={!!field.state.meta.errors.length}>
												Categoría
											</FormLabel>
											<Select
												value={field.state.value}
												onValueChange={field.handleChange}
											>
												<FormControl error={!!field.state.meta.errors.length}>
													<SelectTrigger className="bg-white h-11">
														<SelectValue placeholder="Seleccionar Categoría" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{categories.map((c) => (
														<SelectItem key={c._id} value={c._id}>
															{c.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage>
												{formatFieldErrors(field.state.meta.errors)}
											</FormMessage>
										</FormItem>
									)}
								</form.Field>

								<form.Field name="type">
									{(field) => (
										<FormItem>
											<FormLabel>Tipo</FormLabel>
											<FormControl>
												<div className="flex items-center bg-white rounded-md border p-1 h-11">
													{(["product", "addon", "note"] as const).map((t) => (
														<button
															key={t}
															onClick={() => field.handleChange(t)}
															className={clsx(
																"flex-1 text-sm font-medium rounded-sm py-1.5 capitalize transition-colors",
																field.state.value === t
																	? "bg-slate-900 text-white shadow-sm"
																	: "text-muted-foreground hover:bg-gray-100",
															)}
															type="button"
														>
															{TYPE_LABELS[t]}
														</button>
													))}
												</div>
											</FormControl>
											<FormMessage>
												{formatFieldErrors(field.state.meta.errors)}
											</FormMessage>
										</FormItem>
									)}
								</form.Field>
							</div>

							{/* Name and Price Row */}
							{type !== "addon" && (
								<div className="grid grid-cols-[2fr_1fr] gap-6">
									<form.Field name="name">
										{(field) => (
											<FormItem>
												<FormLabel error={!!field.state.meta.errors.length}>
													{type === "note"
														? "Detalles de la Nota"
														: "Nombre del Producto"}
												</FormLabel>
												<FormControl error={!!field.state.meta.errors.length}>
													<Input
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder={
															type === "note"
																? "Introduce el contenido de la nota..."
																: "Nombre del producto"
														}
														className="bg-white h-12 text-lg"
													/>
												</FormControl>
												<FormMessage>
													{formatFieldErrors(field.state.meta.errors)}
												</FormMessage>
											</FormItem>
										)}
									</form.Field>

									{/* Price Input (only if not note) */}
									{type !== "note" && (
										<form.Field name="price">
											{(field) => (
												<FormItem>
													<FormLabel error={!!field.state.meta.errors.length}>
														Precio
													</FormLabel>
													<div className="relative">
														<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
															€
														</span>
														<FormControl
															error={!!field.state.meta.errors.length}
														>
															<Input
																type="number"
																value={field.state.value}
																onChange={(e) =>
																	field.handleChange(e.target.value)
																}
																className="bg-white h-12 text-lg pl-8 font-bold"
																step="0.01"
															/>
														</FormControl>
													</div>
													<FormMessage>
														{formatFieldErrors(field.state.meta.errors)}
													</FormMessage>
												</FormItem>
											)}
										</form.Field>
									)}
								</div>
							)}

							{/* Type Specific Fields */}
							{type === "product" && (
								<div className="space-y-3">
									<span className="text-sm font-semibold">
										Ingredientes Base
									</span>
									<div className="bg-white border rounded-lg">
										{selectedIngredients.map(
											(ing: { id: string; name: string }) => (
												<div
													key={ing.id}
													className="flex justify-between items-center px-4 py-3 border-b last:border-0 hover:bg-gray-50"
												>
													<span className="font-medium">{ing.name}</span>
													<button
														onClick={() => {
															form.setFieldValue(
																"selectedIngredients",
																(prev) => prev.filter((i) => i.id !== ing.id),
															);
														}}
														className="text-gray-400 hover:text-red-500"
														type="button"
													>
														<X className="h-4 w-4" />
													</button>
												</div>
											),
										)}
										<div className="p-2 bg-gray-50 border-t">
											<div className="relative">
												<Input
													placeholder="+ Añadir ingrediente..."
													value={ingredientSearch}
													onChange={(e) => setIngredientSearch(e.target.value)}
													className="bg-white border-0 shadow-none focus-visible:ring-0 px-2"
												/>
												{ingredientSearch && (
													<div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg mt-1 z-10 max-h-40 overflow-y-auto">
														{filteredIngredients.length === 0 ? (
															<div className="p-2 text-sm text-gray-500">
																No encontrado
															</div>
														) : (
															filteredIngredients.map((ing) => (
																<button
																	key={ing._id}
																	className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer text-sm"
																	onClick={() => {
																		form.pushFieldValue("selectedIngredients", {
																			id: ing._id,
																			name: ing.name,
																		});
																		setIngredientSearch("");
																	}}
																	type="button"
																>
																	{ing.name}
																</button>
															))
														)}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							)}

							{type === "addon" && (
								<div className="grid grid-cols-[2fr_1fr] gap-6">
									<div className="space-y-3">
										<span className="text-sm font-semibold">
											Vincular Ingrediente (Extra)
										</span>
										<div className="bg-white border rounded-lg">
											{linkedIngredientId ? (
												<div className="flex justify-between items-center px-4 py-3 bg-gray-50 h-12">
													<span className="font-medium">
														{form.getFieldValue("name") ||
															"Ingrediente Seleccionado"}
													</span>
													<button
														onClick={() => {
															form.setFieldValue(
																"linkedIngredientId",
																undefined,
															);
															form.setFieldValue("name", "");
														}}
														className="text-gray-400 hover:text-red-500"
														type="button"
													>
														<X className="h-4 w-4" />
													</button>
												</div>
											) : (
												<div className="p-1">
													<div className="relative">
														<Input
															placeholder="Buscar ingrediente para extra..."
															value={ingredientSearch}
															onChange={(e) =>
																setIngredientSearch(e.target.value)
															}
															className="bg-white border-0 shadow-none focus-visible:ring-0 px-2 h-10"
														/>
														{ingredientSearch && (
															<div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg mt-1 z-10 max-h-40 overflow-y-auto">
																{filteredAddonIngredients.length === 0 ? (
																	<div className="p-2 text-sm text-gray-500">
																		No encontrado
																	</div>
																) : (
																	filteredAddonIngredients.map((ing) => (
																		<button
																			key={ing._id}
																			className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer text-sm"
																			onClick={() => {
																				form.setFieldValue(
																					"linkedIngredientId",
																					ing._id,
																				);
																				form.setFieldValue("name", ing.name);
																				setIngredientSearch("");
																			}}
																			type="button"
																		>
																			{ing.name}
																		</button>
																	))
																)}
															</div>
														)}
													</div>
												</div>
											)}
										</div>
									</div>

									<form.Field name="price">
										{(field) => (
											<FormItem>
												<FormLabel error={!!field.state.meta.errors.length}>
													Precio
												</FormLabel>
												<div className="relative">
													<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
														€
													</span>
													<FormControl error={!!field.state.meta.errors.length}>
														<Input
															type="number"
															value={field.state.value}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															className="bg-white h-12 text-lg pl-8 font-bold"
															step="0.01"
														/>
													</FormControl>
												</div>
												<FormMessage>
													{formatFieldErrors(field.state.meta.errors)}
												</FormMessage>
											</FormItem>
										)}
									</form.Field>
								</div>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
