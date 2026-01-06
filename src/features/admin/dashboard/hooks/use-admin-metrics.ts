import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useAdminMetrics() {
	const { data } = useSuspenseQuery(
		convexQuery(api.analytics.getTodayMetrics, {}),
	);
	return data;
}
