import { cn } from "@/shared/lib/utils";

type TableStatus = "pending" | "waiting" | "code3" | "free" | "served";

interface StatusStyle {
	ring: string;
	bg: string;
	number: string;
	footer: string;
}

const STATUS_STYLES: Record<TableStatus, StatusStyle> = {
	pending: {
		ring: "border-blue-500",
		bg: "bg-white",
		number: "text-slate-800",
		footer: "text-slate-500",
	},
	waiting: {
		ring: "border-yellow-400",
		bg: "bg-white",
		number: "text-slate-800",
		footer: "text-slate-500",
	},
	code3: {
		ring: "border-red-500",
		bg: "bg-white",
		number: "text-slate-800",
		footer: "text-slate-500",
	},
	free: {
		ring: "border-emerald-500",
		bg: "bg-white",
		number: "text-slate-800",
		footer: "text-emerald-500 font-bold",
	},
	served: {
		ring: "border-[#8B5E3C]",
		bg: "bg-[#8B5E3C]",
		number: "text-white",
		footer: "text-slate-500",
	},
};

interface TableCircleProps {
	number: number;
	status: TableStatus;
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
	const style = STATUS_STYLES[status];
	const footerColor = isWarning ? "text-red-600 font-extrabold" : style.footer;

	return (
		<button
			type="button"
			className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95 bg-transparent border-none p-0"
			onClick={onClick}
		>
			<div className="relative">
				<div
					className={cn(
						"w-24 h-24 rounded-full border-[5px] flex items-center justify-center shadow-sm",
						style.ring,
						style.bg,
					)}
				>
					<span className={cn("text-3xl font-bold", style.number)}>
						{number}
					</span>
				</div>

				{badge && (
					<div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
						<span className="text-xs font-bold text-white">{badge}</span>
					</div>
				)}
			</div>

			<span className={cn("text-lg font-medium", footerColor)}>
				{time || (status === "free" && "")}
			</span>
		</button>
	);
}
