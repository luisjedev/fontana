import {
	ALLERGEN_ICONS,
	type AllergenName,
} from "@/shared/components/allergens";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
	DEFAULT_INGREDIENT_ICON,
	INGREDIENTS_ICONS,
} from "@/shared/lib/ingredient-icons";
import type { Allergen, Ingredient } from "@/shared/types";

interface IngredientsListProps {
	ingredients: Ingredient[];
	allergens: Allergen[];
	onEdit: (ingredient: Ingredient) => void;
}

export function IngredientsList({
	ingredients,
	allergens,
	onEdit,
}: IngredientsListProps) {
	const allergensMap = new Map(allergens?.map((a) => [a._id, a]));

	return (
		<div className="w-full">
			<div className="grid grid-cols-3 gap-4 px-8 py-3 text-xs font-semibold text-muted-foreground border-b bg-gray-50/50">
				<div>NOMBRE</div>
				<div className="text-center">ALERGENOS</div>
				<div className="text-right">ACCIONES</div>
			</div>

			<div className="divide-y result-list">
				{ingredients.map((item) => {
					const Icon =
						INGREDIENTS_ICONS[item.name.toLowerCase()] ||
						DEFAULT_INGREDIENT_ICON;

					return (
						<div
							key={item._id}
							className="grid grid-cols-3 gap-4 px-8 py-4 items-center hover:bg-gray-50/50 transition-colors group"
						>
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-lg flex items-center justify-center text-xl bg-gray-100 text-gray-600">
									<Icon className="h-5 w-5" />
								</div>
								<div className="flex flex-col">
									<span className="font-semibold text-gray-900">
										{item.name}
									</span>
									{item.kitchenName && (
										<span className="text-xs text-muted-foreground font-medium">
											{item.kitchenName}
										</span>
									)}
								</div>
							</div>

							{/* Allergens Column */}
							<div className="flex items-center gap-1.5 flex-wrap justify-center">
								{item.allergens?.map((allergenId) => {
									const allergen = allergensMap.get(allergenId);
									if (!allergen) return null;
									const AllergenIcon =
										ALLERGEN_ICONS[allergen.name as AllergenName];

									if (!AllergenIcon) return null;

									return (
										<div
											key={allergenId}
											className="text-gray-400"
											title={allergen.name}
										>
											<AllergenIcon className="size-6" />
										</div>
									);
								})}
								{(!item.allergens || item.allergens.length === 0) && (
									<span className="text-gray-300 text-xs">-</span>
								)}
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
				{ingredients.length === 0 && (
					<div className="p-8 text-center text-muted-foreground">
						No se han encontrado ingredientes. Añade uno para comenzar.
					</div>
				)}
			</div>
		</div>
	);
}

export function IngredientsListSkeleton() {
	return (
		<div className="w-full">
			<div className="grid grid-cols-3 gap-4 px-8 py-3 text-xs font-semibold text-muted-foreground border-b bg-gray-50/50">
				<div>NOMBRE</div>
				<div>ALERGENOS</div>
				<div className="text-right">ACCIONES</div>
			</div>
			<div className="divide-y">
				{Array.from({ length: 5 }, (_, i) => `skeleton-${i}`).map((id) => (
					<div
						key={id}
						className="grid grid-cols-3 gap-4 px-8 py-4 items-center"
					>
						<div className="flex items-center gap-4">
							<Skeleton className="h-10 w-10 rounded-lg" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-6 w-6 rounded-full" />
							<Skeleton className="h-6 w-6 rounded-full" />
						</div>
						<div className="flex justify-end">
							<Skeleton className="h-8 w-8 rounded-md" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
