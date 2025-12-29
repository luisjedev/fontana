import { Hourglass } from "lucide-react";

export function WaitlistBar() {
	const waitlistItems = [
		{ p: "4p", t: "2 min" },
		{ p: "2p", t: "4 min" },
		{ p: "3p", t: "6 min" },
		{ p: "5p", t: "8 min" },
		{ p: "2p", t: "10 min" },
	];

	return (
		<div className="flex items-center gap-6 mb-4 w-full border-b border-slate-400">
			{/* Header Label */}
			<div className="flex items-center gap-2 text-slate-400">
				<Hourglass size={20} />
				<span className="text-xs font-bold tracking-widest">EN COLA</span>
			</div>

			{/* Scrollable list */}
			<div className="flex-1 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
				{waitlistItems.map((item, i) => (
					<div
						key={i}
						className="shrink-0 flex items-center bg-white rounded-full px-4 py-3 shadow-sm border border-slate-100 min-w-[120px] justify-between"
					>
						<span className="font-bold text-slate-800 text-sm">{item.p}</span>
						<span className="text-slate-500 text-xs font-medium ml-2">
							{item.t}
						</span>
						<span className="text-slate-300 ml-2">→</span>
					</div>
				))}
			</div>
		</div>
	);
}
