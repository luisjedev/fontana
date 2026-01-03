import { cn } from "@/shared/lib/utils";

interface TableCircleProps {
	number: number;
	status: "pending" | "waiting" | "code3" | "free" | "served";
	time?: string;
	badge?: number;
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

	let circleBg = "bg-white";
	let numberColor = "text-slate-800";

	if (status === "served") {
		ringColor = "border-[#D4B483]"; // Light brown border/match
		circleBg = "bg-[#D4B483]"; // Light brown fill
		numberColor = "text-white";
	}

	return (
		<button
			type="button"
			className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95 bg-transparent border-none p-0"
			onClick={onClick}
		>
			<div className="relative">
				{/* Ring */}
				<div
					className={cn(
						"w-24 h-24 rounded-full border-[5px] flex items-center justify-center shadow-sm",
						ringColor,
						circleBg,
					)}
				>
					<span className={cn("text-3xl font-bold", numberColor)}>
						{number}
					</span>
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
		</button>
	);
}
