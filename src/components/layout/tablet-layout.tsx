import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MainPanel } from "../dashboard/main-panel";
import { Sidebar } from "../dashboard/Sidebar";

type MobileView = "sidebar" | "main";

export function TabletLayout() {
	const [activeView, setActiveView] = useState<MobileView>("sidebar");

	const toggleView = () => {
		setActiveView((prev) => (prev === "sidebar" ? "main" : "sidebar"));
	};

	return (
		<>
			{/* Desktop/Tablet: Side-by-side layout */}
			<div className="hidden md:flex w-screen h-screen bg-[#F8F9FC] overflow-hidden font-sans">
				<Sidebar />
				<MainPanel />
			</div>

			{/* Mobile: Single view with toggle */}
			<div className="flex md:hidden w-screen h-screen bg-[#F8F9FC] overflow-hidden font-sans">
				{activeView === "sidebar" ? (
					<Sidebar
						showToggle={true}
						onToggleView={toggleView}
						isOnSidebar={true}
					/>
				) : (
					<>
						<MainPanel />
						{/* FAB to go back to sidebar on Main view */}
						<Button
							type="button"
							onClick={toggleView}
							className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white w-14 h-14 rounded-full shadow-xl active:scale-95 transition-transform flex items-center justify-center p-0"
						>
							<Plus size={24} />
						</Button>
					</>
				)}
			</div>
		</>
	);
}
