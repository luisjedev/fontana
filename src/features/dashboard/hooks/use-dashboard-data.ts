import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useTables() {
	const { data } = useSuspenseQuery(convexQuery(api.tables.list, {}));
	return data;
}

export function useWaitlist() {
	const { data } = useSuspenseQuery(convexQuery(api.waitlist.list, {}));
	return data;
}
