import { createFileRoute } from "@tanstack/react-router";

import { serve } from "inngest/edge";
import { functions, inngest } from "@/shared/inngest";

const handler = serve({ client: inngest, functions });

// @ts-expect-error - API routes are not included in navigable routes types
export const Route = createFileRoute("/api/inngest")({
	server: {
		handlers: {
			GET: async ({ request }) => handler(request),
			POST: async ({ request }) => handler(request),
			PUT: async ({ request }) => handler(request),
		},
	},
});
