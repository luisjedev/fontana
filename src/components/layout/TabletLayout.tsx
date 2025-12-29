import { MainPanel } from "../dashboard/MainPanel";
import { Sidebar } from "../dashboard/Sidebar";

export function TabletLayout() {
	return (
		<div className="flex w-screen h-screen bg-[#F8F9FC] overflow-hidden font-sans">
			<Sidebar />
			<MainPanel />
		</div>
	);
}
