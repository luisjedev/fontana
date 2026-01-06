import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useAnalyticsMetrics() {
	const { data } = useSuspenseQuery(
		convexQuery(api.analytics.getTodayMetrics, {}),
	);
	return data;
}
