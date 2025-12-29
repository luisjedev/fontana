import { cn } from "@/lib/utils";

interface TableCircleProps {
	number: string;
	status: "pending" | "waiting" | "occupied" | "free";
	time?: string; // '2 min', 'Now', '15 min'
	badge?: number; // Notification count
}

export function TableCircle({ number, status, time, badge }: TableCircleProps) {
	// Styles based on status
	const styles = {
		pending: {
			ring: "border-blue-500",
			text: "text-slate-900",
			footer: "text-slate-500",
		},
		waiting: {
			ring: "border-orange-500",
			text: "text-slate-900",
			footer: "text-slate-500",
		},
		occupied: {
			ring: "border-blue-500", // Assuming 'Now' ones are generic blue or specific
			text: "text-slate-900",
			footer: "text-slate-500",
		},
		free: {
			ring: "border-emerald-500",
			text: "text-slate-900",
			footer: "text-emerald-500 font-bold",
		},
	};

	// The design has heavy rings.
	// Using Tailwind borders.

	let ringColor = "border-slate-200";
	let footerColor = "text-slate-500";

	if (status === "pending") ringColor = "border-blue-500"; // 01, 15
	if (status === "waiting") ringColor = "border-orange-500"; // 02, 14
	if (status === "free") {
		ringColor = "border-emerald-500";
		footerColor = "text-emerald-500 font-bold";
	}

	// Custom Override for the "Now" blue ones if different from pending?
	// It seems 05, 06, 10, 11 are Blue. 15 is Blue.
	// 02, 04, 07, 09, 12, 14 are Orange.
	// 03, 08, 13 are Green.

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="relative">
				{/* Ring */}
				<div
					className={cn(
						"w-24 h-24 rounded-full border-[5px] flex items-center justify-center bg-white shadow-sm",
						ringColor,
					)}
				>
					<span className="text-3xl font-bold text-slate-800">{number}</span>
				</div>

				{/* Badge */}
				{badge && (
					<div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
						<span className="text-xs font-bold text-white">{badge}</span>
					</div>
				)}
			</div>

			{/* Footer Text */}
			<span className={cn("text-xs font-medium", footerColor)}>
				{time || (status === "free" && "")}
			</span>
		</div>
	);
}
