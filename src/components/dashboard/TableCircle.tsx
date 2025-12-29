import { cn } from "@/lib/utils";

interface TableCircleProps {
	number: string;
	status: "pending" | "waiting" | "code3" | "free";
	time?: string; // '2 min', 'Now', '15 min'
	badge?: number; // Notification count
	onClick?: () => void;
	isWarning?: boolean;
}

export function TableCircle({
	number,
	status,
	time,
	badge,
	onClick,
	isWarning,
}: TableCircleProps) {
	// The design has heavy rings.
	// Using Tailwind borders.

	let ringColor = "border-slate-200";
	let footerColor = "text-slate-500";
	if (isWarning) footerColor = "text-red-600 font-extrabold";

	if (status === "pending") ringColor = "border-blue-500";
	if (status === "waiting") ringColor = "border-yellow-400";
	if (status === "code3") ringColor = "border-red-500";
	if (status === "free") {
		ringColor = "border-emerald-500";
		footerColor = "text-emerald-500 font-bold";
	}

	// Custom Override for the "Now" blue ones if different from pending?
	// It seems 05, 06, 10, 11 are Blue. 15 is Blue.
	// 02, 04, 07, 09, 12, 14 are Orange.
	// 03, 08, 13 are Green.

	return (
		<div
			className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95"
			onClick={onClick}
		>
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
			<span className={cn("text-lg font-medium", footerColor)}>
				{time || (status === "free" && "")}
			</span>
		</div>
	);
}
