import { useMutation, useQuery } from "convex/react";
import { Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

export function WaitlistBar() {
	const waitlistItems = useQuery(api.waitlist.list) || [];
	const removeItem = useMutation(api.waitlist.remove);

	if (waitlistItems.length === 0) return null;

	const formatTimeAgo = (timestamp: number) => {
		const diff = Date.now() - timestamp;
		const minutes = Math.floor(diff / 60000);
		if (minutes < 1) return "Now";
		return `${minutes} min`;
	};

	return (
		<div className="flex items-center gap-8 mb-6 w-full border-b border-slate-400 pb-4 h-24">
			{/* Header Label */}
			<div className="flex items-center gap-3 text-slate-400 pl-2">
				<Hourglass size={32} />
			</div>

			{/* Scrollable list */}
			<div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide items-center h-full">
				{waitlistItems.map((item) => {
					const diff = Date.now() - item.createdAt;
					const minutes = Math.floor(diff / 60000);
					const isWarning = minutes > 10;

					return (
						<button
							type="button"
							key={item._id}
							onClick={() => removeItem({ id: item._id })}
							className="shrink-0 flex items-center bg-white rounded-2xl px-6 py-4 shadow-md border border-slate-200 min-w-[160px] justify-between h-16 hover:bg-red-50 transition-colors group cursor-pointer"
						>
							<span className="font-bold text-slate-800 text-2xl group-hover:text-red-600 transition-colors">
								{item.people}
							</span>
							<span
								className={cn(
									"text-lg font-semibold ml-4",
									isWarning ? "text-red-600 font-extrabold" : "text-slate-500",
								)}
							>
								{formatTimeAgo(item.createdAt)}
							</span>
							<span className="text-slate-300 ml-4 scale-125 group-hover:text-red-300">
								→
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
