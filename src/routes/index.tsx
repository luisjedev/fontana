import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/features/dashboard";

export const Route = createFileRoute("/")({
	component: DashboardView,
	loader: async ({ context: { queryClient } }) => {
		await Promise.all([
			queryClient.ensureQueryData(convexQuery(api.tables.list, {})),
			queryClient.ensureQueryData(convexQuery(api.waitlist.list, {})),
		]);
	},
});
