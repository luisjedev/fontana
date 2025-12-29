export function WaitlistBar() {
	const waitlistItems = [
		{ p: "4P", t: "2 min" },
		{ p: "2P", t: "4 min" },
		{ p: "3P", t: "6 min" },
		{ p: "5P", t: "8 min" },
		{ p: "2P", t: "10 min" },
	];

	return (
		<div className="flex items-center gap-8 mb-6 w-full border-b border-slate-400 pb-4 h-24">
			<div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide items-center h-full">
				{waitlistItems.map((item, i) => (
					<div
						key={i}
						className="shrink-0 flex items-center bg-white rounded-2xl px-6 py-4 shadow-md border border-slate-200 min-w-[160px] justify-between h-16"
					>
						<span className="font-bold text-slate-800 text-2xl p-2 bg-slate-100 rounded-full">
							{item.p}
						</span>
						<span className="text-slate-500 text-lg font-semibold ml-4">
							{item.t}
						</span>
						<span className="text-slate-300 ml-4 scale-125">→</span>
					</div>
				))}
			</div>
		</div>
	);
}
