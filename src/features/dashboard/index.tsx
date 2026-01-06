import { Plus } from "lucide-react";
import { useState } from "react";
import { MainPanel } from "@/features/dashboard/components/main-panel/main-panel";
import { Sidebar } from "@/features/dashboard/components/sidebar/sidebar";
import {
	useTables,
	useWaitlist,
} from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/shared/components/ui/button";

type MobileView = "sidebar" | "main";

export function DashboardView() {
	const [activeView, setActiveView] = useState<MobileView>("sidebar");
	const tables = useTables();
	const waitlist = useWaitlist();

	const toggleView = () => {
		setActiveView((prev) => (prev === "sidebar" ? "main" : "sidebar"));
	};

	return (
		<>
			{/* Desktop/Tablet: Side-by-side layout */}
			<div className="hidden md:flex w-screen h-screen bg-[#F8F9FC] overflow-hidden font-sans">
				<Sidebar />
				<MainPanel tables={tables} waitlist={waitlist} />
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
						<MainPanel tables={tables} waitlist={waitlist} />
						{/* FAB to go back to sidebar on Main view */}
						<Button
							type="button"
							onClick={toggleView}
							className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white size-16 rounded-full shadow-xl active:scale-95 transition-transform flex items-center justify-center p-0"
						>
							<Plus size={24} className="size-8" strokeWidth={2.5} />
						</Button>
					</>
				)}
			</div>
		</>
	);
}
