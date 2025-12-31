import { createFileRoute } from "@tanstack/react-router";
import { TabletLayout } from "../components/layout/tablet-layout";

export const Route = createFileRoute("/")({
	component: TabletLayout,
});
