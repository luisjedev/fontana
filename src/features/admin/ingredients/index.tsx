import { convexQuery } from "@convex-dev/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CreateIngredientModal } from "@/features/admin/ingredients/components/create-ingredient-modal";
import {
	IngredientsList,
	IngredientsListSkeleton,
} from "@/features/admin/ingredients/components/ingredients-list";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import type { Ingredient } from "@/shared/types";
import { api } from "../../../../convex/_generated/api";

export function IngredientsView() {
	const convex = useConvex();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(
		null,
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const { data: allergens } = useQuery(convexQuery(api.allergens.list, {}));

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingIngredients,
	} = useInfiniteQuery({
		queryKey: ["ingredients", debouncedSearchQuery],
		queryFn: async ({
			pageParam,
		}): Promise<{
			page: Ingredient[];
			isDone: boolean;
			continueCursor: string;
		}> => {
			return convex.query(api.ingredients.list, {
				search: debouncedSearchQuery || undefined,
				paginationOpts: {
					numItems: 5,
					cursor: pageParam as string | null,
				},
			});
		},
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) =>
			lastPage.isDone ? null : lastPage.continueCursor,
	});

	const ingredients = useMemo(
		() => data?.pages.flatMap((page) => page.page) ?? [],
		[data],
	);

	const handleEdit = (ingredient: Ingredient) => {
		setEditingIngredient(ingredient);
		setIsCreateModalOpen(true);
	};

	const handleCreate = () => {
		setEditingIngredient(null);
		setIsCreateModalOpen(true);
	};

	return (
		<div className="flex flex-col h-full bg-white dark:bg-zinc-950">
			<CreateIngredientModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
				allergens={allergens ?? []}
				ingredient={editingIngredient}
			/>
			<div className="p-8 pb-4 border-b">
				<div className="flex justify-between items-start mb-6">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Ingredientes</h1>
						<p className="text-muted-foreground mt-1">
							Gestiona tu inventario de ingredientes y detalles.
						</p>
					</div>
					<Button
						onClick={handleCreate}
						className="bg-blue-600 hover:bg-blue-700 text-white gap-2 py-6 font-semibold"
					>
						<Plus className="h-4 w-4" strokeWidth={2} />
						NUEVO INGREDIENTE
					</Button>
				</div>

				<div className="relative max-w-sm mt-4">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Buscar ingredientes..."
						className="pl-9 bg-white"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				{isLoadingIngredients || !allergens ? (
					<IngredientsListSkeleton />
				) : (
					<IngredientsList
						ingredients={ingredients}
						allergens={allergens}
						onEdit={handleEdit}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
					/>
				)}
			</div>
		</div>
	);
}
