import { createFileRoute } from "@tanstack/react-router";
import { TabletLayout } from "../components/layout/layout";

export const Route = createFileRoute("/")({
	component: TabletLayout,
});
