import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProvider } from "convex/react";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
	console.error("missing envar CONVEX_URL");
}

export const createConvexQueryClient = () => new ConvexQueryClient(CONVEX_URL);

export default function AppConvexProvider({
	children,
	client,
}: {
	children: React.ReactNode;
	client: ConvexQueryClient;
}) {
	return (
		<ConvexProvider client={client.convexClient}>{children}</ConvexProvider>
	);
}
