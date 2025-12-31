import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsView } from "@/features/analytics";

export const Route = createFileRoute("/analytics")({
	component: AnalyticsView,
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(
			convexQuery(api.analytics.getTodayMetrics, {}),
		);
	},
});
