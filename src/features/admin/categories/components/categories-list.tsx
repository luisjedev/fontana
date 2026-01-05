import { LayoutGrid } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { Category } from "@/shared/types";

interface CategoriesListProps {
	categories: Category[];
	onEdit: (category: Category) => void;
}

export function CategoriesList({ categories, onEdit }: CategoriesListProps) {
	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-3 text-xs font-semibold text-muted-foreground border-b bg-gray-50/50">
				<div className="w-10">ICONO</div>
				<div>NOMBRE</div>
				<div>Nº ITEMS</div>
				<div>IVA %</div>
				<div>ESTADO</div>
				<div>ACCIONES</div>
			</div>

			<div className="divide-y result-list">
				{categories.map((item) => {
					return (
						<div
							key={item._id}
							className="grid grid-cols-[auto_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-4 items-center hover:bg-gray-50/50 transition-colors group"
						>
							<div className="w-10 flex justify-center">
								{item.image ? (
									<img
										src={item.image}
										alt={item.name}
										className="h-10 w-10 rounded-lg object-cover bg-gray-100"
									/>
								) : (
									<div
										className="h-10 w-10 rounded-lg flex items-center justify-center text-xl"
										style={{ backgroundColor: item.tag_color || "#F3F4F6" }}
									>
										<LayoutGrid className="h-5 w-5 text-gray-600 opacity-70" />
									</div>
								)}
							</div>

							<div className="flex flex-col">
								<span className="font-semibold text-gray-900">{item.name}</span>
							</div>

							<div className="text-gray-600 font-medium pl-4">
								{/* Placeholder for items count */}-
							</div>

							<div className="text-gray-600 font-medium pl-4">
								{item.tax_percent}%
							</div>

							<div className="pl-4">
								<Badge
									variant={item.isArchived ? "secondary" : "default"}
									className={
										item.isArchived
											? "bg-gray-200 text-gray-600 hover:bg-gray-300"
											: "bg-green-100 text-green-700 hover:bg-green-200 shadow-none"
									}
								>
									{item.isArchived ? "Archived" : "Active"}
								</Badge>
							</div>

							{/* Actions Column */}
							<div className="flex justify-end">
								<Button
									variant="ghost"
									size="icon"
									className="text-white bg-slate-900 py-6 px-10"
									onClick={() => onEdit(item)}
								>
									Editar
								</Button>
							</div>
						</div>
					);
				})}
				{categories.length === 0 && (
					<div className="p-8 text-center text-muted-foreground">
						No se han encontrado categorías. Añade una para comenzar.
					</div>
				)}
			</div>
		</div>
	);
}

export function CategoriesListSkeleton() {
	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-3 text-xs font-semibold text-muted-foreground border-b bg-gray-50/50">
				<div className="w-10">ICON</div>
				<div>NAME</div>
				<div>ITEMS COUNT</div>
				<div>TAX PERCENT</div>
				<div>STATUS</div>
				<div className="text-right">ACTIONS</div>
			</div>
			<div className="divide-y">
				{Array.from({ length: 5 }, (_, i) => `skeleton-${i}`).map((id) => (
					<div
						key={id}
						className="grid grid-cols-[auto_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-8 py-4 items-center"
					>
						<Skeleton className="h-10 w-10 rounded-lg" />
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-6 w-20 rounded-full" />
						<div className="flex justify-end">
							<Skeleton className="h-8 w-20 rounded-md" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
