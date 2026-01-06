import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useProducts() {
	const { data } = useSuspenseQuery(convexQuery(api.products.list, {}));
	return data;
}
