import { Check, Circle } from "lucide-react";
import {
	ALLERGEN_ICONS,
	type AllergenName,
} from "@/shared/components/allergens";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { Allergen } from "@/shared/types";

interface AllergenSelectorProps {
	value: Allergen[];
	onChange: (value: Allergen[]) => void;
	allergens?: Allergen[];
}

export function AllergenSelector({
	value,
	onChange,
	allergens,
}: AllergenSelectorProps) {
	const toggleAllergen = (allergen: Allergen) => {
		if (value.includes(allergen)) {
			onChange(value.filter((a) => a !== allergen));
		} else {
			onChange([...value, allergen]);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-sm font-semibold text-foreground">
					Selector de alergias
				</span>
				<Button
					variant="ghost"
					size="sm"
					className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:bg-transparent"
					onClick={() => onChange([])}
				>
					Limpiar
				</Button>
			</div>

			<div className="grid grid-cols-5 gap-2">
				{allergens?.map((item) => {
					const isSelected = value.includes(item);
					const Icon = ALLERGEN_ICONS[item.name as AllergenName] || Circle;

					return (
						<button
							key={item._id}
							type="button"
							onClick={() => toggleAllergen(item)}
							aria-pressed={isSelected}
							className={cn(
								"cursor-pointer flex flex-col items-center justify-center rounded-xl border-2 transition-all relative h-28 w-full",
								isSelected
									? "border-blue-500 bg-blue-50"
									: "border-border bg-white hover:border-gray-300",
							)}
						>
							{isSelected && (
								<div className="absolute top-2 right-2 bg-blue-500 rounded-full p-0.5">
									<Check className="h-3 w-3 text-white" />
								</div>
							)}
							<div
								className={cn(
									"mb-2",
									isSelected ? "text-blue-500" : "text-gray-500",
								)}
							>
								<Icon className={cn("h-8 w-8", isSelected && "fill-current")} />
							</div>
							<span
								className={cn(
									"text-sm font-medium text-center wrap-break-words w-full px-1",
									isSelected ? "text-blue-600" : "text-gray-600",
								)}
							>
								{item.name}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
