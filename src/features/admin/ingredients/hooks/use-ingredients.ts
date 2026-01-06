import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useIngredients() {
	const { data } = useSuspenseQuery(convexQuery(api.ingredients.list, {}));
	return data;
}
