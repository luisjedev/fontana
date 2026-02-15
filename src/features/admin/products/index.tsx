import type { Id } from "@convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateProductModal } from "@/features/admin/products/components/create-product-modal";
import {
	ProductsList,
	ProductsListSkeleton,
} from "@/features/admin/products/components/products-list";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import type { Product } from "@/shared/types";
import { api } from "../../../../convex/_generated/api";

export function ProductsView() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

	// Filters
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedType, setSelectedType] = useState<string>("all");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Fetch Data
	const { data: categories } = useQuery(convexQuery(api.categories.list, {}));
	const { data: ingredients } = useQuery(
		convexQuery(api.ingredients.getAll, {}),
	);

	// Build query args
	const queryArgs: {
		search?: string;
		categoryId?: Id<"categories">;
		type?: string;
	} = {
		search: debouncedSearchQuery || undefined,
	};

	if (selectedCategory && selectedCategory !== "all") {
		queryArgs.categoryId = selectedCategory as Id<"categories">;
	}
	if (selectedType && selectedType !== "all") {
		queryArgs.type = selectedType;
	}

	const { data: products, isLoading: isLoadingProducts } = useQuery(
		convexQuery(api.products.list, queryArgs),
	);

	const handleEdit = (product: Product) => {
		setEditingProduct(product);
		setIsCreateModalOpen(true);
	};

	const handleCreate = () => {
		setEditingProduct(null);
		setIsCreateModalOpen(true);
	};

	const isLoading =
		isLoadingProducts || !products || !categories || !ingredients;

	return (
		<div className="flex flex-col h-full bg-white dark:bg-zinc-950">
			{/* Modals */}
			<CreateProductModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
				product={editingProduct}
				categories={categories ?? []}
				ingredients={ingredients ?? []}
			/>

			{/* Header & Filters */}
			<div className="p-8 pb-4 border-b space-y-6">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Productos</h1>
						<p className="text-muted-foreground mt-1">
							Gestiona tu carta de productos, extras y notas de cocina.
						</p>
					</div>
					<Button
						onClick={handleCreate}
						className="bg-blue-600 hover:bg-blue-700 text-white gap-2 py-6 font-semibold"
					>
						<Plus className="h-4 w-4" strokeWidth={2} />
						NUEVO PRODUCTO
					</Button>
				</div>

				<div className="flex gap-4">
					<div className="relative flex-1 max-w-sm">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar productos..."
							className="pl-9 bg-white"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger className="w-50 bg-white">
							<SelectValue placeholder="Categoría" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todas las categorías</SelectItem>
							{categories?.map((c) => (
								<SelectItem key={c._id} value={c._id}>
									{c.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={selectedType} onValueChange={setSelectedType}>
						<SelectTrigger className="w-45 bg-white">
							<SelectValue placeholder="Tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos los tipos</SelectItem>
							<SelectItem value="product">Productos</SelectItem>
							<SelectItem value="addon">Extras</SelectItem>
							<SelectItem value="note">Notas</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				{isLoading ? (
					<ProductsListSkeleton />
				) : (
					<ProductsList
						products={products}
						categories={categories}
						onEdit={handleEdit}
					/>
				)}
			</div>
		</div>
	);
}
