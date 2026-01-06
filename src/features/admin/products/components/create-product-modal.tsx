import { clsx } from "clsx";
import { Check, X } from "lucide-react";
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
import type { Category, Ingredient, Product } from "@/shared/types";
import { useProductForm } from "../hooks/use-product-form";

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
	const {
		formState,
		setField,
		ingredientSearch,
		setIngredientSearch,
		isSubmitting,
		handleSubmit,
		addIngredient,
		removeIngredient,
		selectAddonIngredient,
		removeAddonIngredient,
		filteredIngredients,
		filteredAddonIngredients,
	} = useProductForm({
		open,
		onOpenChange,
		product,
		categories,
		ingredients,
	});

	// Destructure commonly used formState values for cleaner JSX
	const {
		type,
		name,
		price,
		categoryId,
		selectedIngredients,
		linkedIngredientId,
	} = formState;

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
						<Button
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 px-6 py-4"
							onClick={handleSubmit}
							disabled={isSubmitting}
						>
							<Check className="h-4 w-4" strokeWidth={2} />
							{isSubmitting ? "Guardando..." : "Guardar Producto"}
						</Button>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
					<div className="gap-8">
						<div className="space-y-8">
							<div className="grid grid-cols-2 gap-6">
								<div className="space-y-3">
									<span className="text-sm font-semibold">Categoría</span>
									<Select
										value={categoryId}
										onValueChange={(val) => setField("categoryId", val)}
									>
										<SelectTrigger className="bg-white h-11">
											<SelectValue placeholder="Seleccionar Categoría" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((c) => (
												<SelectItem key={c._id} value={c._id}>
													{c.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-3">
									<span className="text-sm font-semibold">Tipo</span>
									<div className="flex items-center bg-white rounded-md border p-1 h-11">
										{(["product", "addon", "note"] as const).map((t) => (
											<button
												key={t}
												onClick={() => setField("type", t)}
												className={clsx(
													"flex-1 text-sm font-medium rounded-sm py-1.5 capitalize transition-colors",
													type === t
														? "bg-slate-900 text-white shadow-sm"
														: "text-muted-foreground hover:bg-gray-100",
												)}
												type="button"
											>
												{t === "product"
													? "Producto"
													: t === "addon"
														? "Extra"
														: "Nota"}
											</button>
										))}
									</div>
								</div>
							</div>

							{/* Name and Price Row */}
							{type !== "addon" && (
								<div className="grid grid-cols-[2fr_1fr] gap-6">
									<div className="space-y-3">
										<span className="text-sm font-semibold">
											{type === "note"
												? "Detalles de la Nota"
												: "Nombre del Producto"}
										</span>
										<Input
											value={name}
											onChange={(e) => setField("name", e.target.value)}
											placeholder={
												type === "note"
													? "Introduce el contenido de la nota..."
													: "Nombre del producto"
											}
											className="bg-white h-12 text-lg"
										/>
									</div>

									{/* Price Input (only if not note) */}
									{type !== "note" && (
										<div className="space-y-3">
											<span className="text-sm font-semibold">Precio</span>
											<div className="relative">
												<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
													€
												</span>
												<Input
													type="number"
													value={price}
													onChange={(e) => setField("price", e.target.value)}
													className="bg-white h-12 text-lg pl-8 font-bold"
													step="0.01"
												/>
											</div>
										</div>
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
										{selectedIngredients.map((ing) => (
											<div
												key={ing.id}
												className="flex justify-between items-center px-4 py-3 border-b last:border-0 hover:bg-gray-50"
											>
												<span className="font-medium">{ing.name}</span>
												<button
													onClick={() => removeIngredient(ing.id)}
													className="text-gray-400 hover:text-red-500"
													type="button"
												>
													<X className="h-4 w-4" />
												</button>
											</div>
										))}
										<div className="p-2 bg-gray-50 border-t">
											{/* Simple Dropdown/Search for adding ingredients */}
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
																	onClick={() => addIngredient(ing)}
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
														{name || "Ingrediente Seleccionado"}
													</span>
													<button
														onClick={removeAddonIngredient}
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
																			onClick={() => selectAddonIngredient(ing)}
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

									<div className="space-y-3">
										<span className="text-sm font-semibold">Precio</span>
										<div className="relative">
											<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
												€
											</span>
											<Input
												type="number"
												value={price}
												onChange={(e) => setField("price", e.target.value)}
												className="bg-white h-12 text-lg pl-8 font-bold"
												step="0.01"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
