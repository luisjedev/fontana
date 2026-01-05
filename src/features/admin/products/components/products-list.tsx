import { clsx } from "clsx";
import { ImageIcon, Package } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { Category, Product } from "@/shared/types";

interface ProductsListProps {
	products: Product[];
	categories: Category[];
	onEdit: (product: Product) => void;
}

export function ProductsList({
	products,
	categories,
	onEdit,
}: ProductsListProps) {
	const categoriesMap = new Map(categories.map((c) => [c._id, c]));

	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-3 text-xs font-semibold text-muted-foreground border-b bg-gray-50/50">
				<div className="w-12">IMAGEN</div>
				<div>NOMBRE</div>
				<div>CATEGORÍA</div>
				<div className="text-end pr-6">TIPO</div>
				<div className="text-center">PRECIO</div>
				<div className="text-center">ACCIONES</div>
			</div>

			<div className="divide-y result-list">
				{products.map((item) => {
					const category = categoriesMap.get(item.categoryId);

					return (
						<div
							key={item._id}
							className="grid grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-4 items-center hover:bg-gray-50/50 transition-colors group"
						>
							<div className="w-12 flex justify-center">
								{item.image ? (
									<img
										src={item.image}
										alt={item.name}
										className="h-12 w-12 rounded-lg object-cover bg-gray-100 border"
									/>
								) : (
									<div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
										<ImageIcon className="h-6 w-6" />
									</div>
								)}
							</div>

							<div className="flex flex-col">
								<span className="font-semibold text-gray-900 text-base">
									{item.name}
								</span>
							</div>

							<div>
								{category ? (
									<Badge
										variant="outline"
										className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 font-bold text-sm h-7 px-3"
										style={{
											backgroundColor: category.tag_color
												? `${category.tag_color}50`
												: undefined,
											borderColor: category.tag_color
												? `${category.tag_color}80`
												: undefined,
											color: category.tag_color,
										}}
									>
										<span
											style={{
												filter: category.tag_color
													? "brightness(0.35) saturate(2.5)"
													: undefined,
											}}
										>
											{category.name}
										</span>
									</Badge>
								) : (
									<span className="text-gray-400 text-sm">-</span>
								)}
							</div>

							<div className="text-end">
								<Badge
									variant="secondary"
									className={clsx(
										"capitalize shadow-none text-sm h-7 px-3",
										item.elementType === "product" &&
											"bg-green-100 text-green-800 hover:bg-green-200",
										item.elementType === "addon" &&
											"bg-purple-100 text-purple-800 hover:bg-purple-200",
										item.elementType === "note" &&
											"bg-gray-100 text-gray-800 hover:bg-gray-200",
									)}
								>
									{item.elementType === "addon"
										? "Extra"
										: item.elementType === "note"
											? "Nota"
											: "Producto"}
								</Badge>
							</div>

							<div className="font-bold text-gray-900 text-center pl-6">
								{item.elementType === "note"
									? "-"
									: `${item.price.toFixed(2)}€`}
							</div>

							{/* Actions Column */}
							<div className="flex justify-end">
								<Button
									variant="ghost"
									size="icon"
									className="text-white bg-slate-900 py-6 px-10 hover:bg-slate-800"
									onClick={() => onEdit(item)}
								>
									Editar
								</Button>
							</div>
						</div>
					);
				})}
				{products.length === 0 && (
					<div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
						<Package className="h-10 w-10 opacity-20" />
						<p>No se han encontrado productos con estos filtros.</p>
					</div>
				)}
			</div>
		</div>
	);
}

export function ProductsListSkeleton() {
	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-3 text-xs font-semibold text-muted-foreground border-b bg-gray-50/50">
				<div className="w-12">IMAGEN</div>
				<div>NOMBRE</div>
				<div>CATEGORÍA</div>
				<div>TIPO</div>
				<div>PRECIO</div>
				<div>ACCIONES</div>
			</div>
			<div className="divide-y">
				{Array.from({ length: 5 }, (_, i) => `skeleton-${i}`).map((id) => (
					<div
						key={id}
						className="grid grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-4 items-center"
					>
						<Skeleton className="h-12 w-12 rounded-lg" />
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-6 w-24 rounded-full" />
						<Skeleton className="h-6 w-20 rounded-full" />
						<Skeleton className="h-6 w-16" />
						<div className="flex justify-end">
							<Skeleton className="h-8 w-20 rounded-md" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
