import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
	CategoriesList,
	CategoriesListSkeleton,
} from "@/features/admin/categories/components/categories-list";
import { CreateCategoryModal } from "@/features/admin/categories/components/create-category-modal";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import type { Category } from "@/shared/types";
import { api } from "../../../../convex/_generated/api";

export function CategoriesView() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const { data: categories, isLoading: isLoadingCategories } = useQuery(
		convexQuery(api.categories.list, { search: debouncedSearchQuery }),
	);

	const handleEdit = (category: Category) => {
		setEditingCategory(category);
		setIsCreateModalOpen(true);
	};

	const handleCreate = () => {
		setEditingCategory(null);
		setIsCreateModalOpen(true);
	};

	return (
		<div className="flex flex-col h-full bg-white dark:bg-zinc-950">
			<CreateCategoryModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
				category={editingCategory}
			/>
			<div className="p-8 pb-4 border-b">
				<div className="flex justify-between items-start mb-6">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
						<p className="text-muted-foreground mt-1">
							Gestiona las categorías de tus productos e impuestos.
						</p>
					</div>
					<Button
						onClick={handleCreate}
						className="bg-blue-600 hover:bg-blue-700 text-white gap-2 py-6 font-semibold"
					>
						<Plus className="h-4 w-4" strokeWidth={2} />
						NUEVA CATEGORÍA
					</Button>
				</div>

				<div className="relative max-w-sm mt-4">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Buscar categorías..."
						className="pl-9 bg-white"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				{isLoadingCategories || !categories ? (
					<CategoriesListSkeleton />
				) : (
					<CategoriesList categories={categories} onEdit={handleEdit} />
				)}
			</div>
		</div>
	);
}
