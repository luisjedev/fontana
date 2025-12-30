import { useState } from "react";
import { MainPanel } from "../dashboard/MainPanel";
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
						<button
							type="button"
							onClick={toggleView}
							className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-xl active:scale-95 transition-transform"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						</button>
					</>
				)}
			</div>
		</>
	);
}
