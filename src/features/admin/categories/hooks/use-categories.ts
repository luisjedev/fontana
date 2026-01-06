import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useCategories() {
	const { data } = useSuspenseQuery(convexQuery(api.categories.list, {}));
	return data;
}
