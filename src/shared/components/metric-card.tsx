import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface MetricCardProps {
	title: string;
	value: string;
	subtext?: React.ReactNode;
	icon: LucideIcon;
	color: "blue" | "green" | "amber" | "red";
}

export function MetricCard({
	title,
	value,
	subtext,
	icon: Icon,
	color,
}: MetricCardProps) {
	const colors = {
		blue: "bg-blue-50 text-blue-600 border-blue-100",
		green: "bg-green-50 text-green-600 border-green-100",
		amber: "bg-amber-50 text-amber-600 border-amber-100",
		red: "bg-red-50 text-red-600 border-red-100",
	};

	return (
		<div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<div className={cn("p-3 rounded-2xl", colors[color])}>
					<Icon size={24} />
				</div>
				<span className="text-slate-500 font-medium text-lg">{title}</span>
			</div>
			<div>
				<div className="text-4xl font-bold text-slate-800">{value}</div>
				{subtext && (
					<div className="text-sm text-slate-400 font-medium mt-1">
						{subtext}
					</div>
				)}
			</div>
		</div>
	);
}
