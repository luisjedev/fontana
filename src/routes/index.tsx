import { createFileRoute } from "@tanstack/react-router";
import { TabletLayout } from "../components/layout/TabletLayout";

export const Route = createFileRoute("/")({
	component: TabletLayout,
});
