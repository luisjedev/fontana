import { useMutation, useQuery } from "convex/react";
import { Hourglass, Users, UserX, Utensils, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export function WaitlistBar() {
	const waitlistItems = useQuery(api.waitlist.list) || [];
	const removeItem = useMutation(api.waitlist.remove);
	const addAbandonment = useMutation(api.abandonments.add);
	const [selectedItem, setSelectedItem] = useState<{
		id: Id<"waitlist">;
		people: number;
	} | null>(null);

	if (waitlistItems.length === 0) return null;

	const formatTimeAgo = (timestamp: number) => {
		const diff = Date.now() - timestamp;
		const minutes = Math.floor(diff / 60000);
		if (minutes < 1) return "Ahora";
		return `${minutes} min`;
	};

	const handleSeated = async () => {
		if (selectedItem) {
			await removeItem({ id: selectedItem.id });
			setSelectedItem(null);
		}
	};

	const handleAbandonment = async () => {
		if (selectedItem) {
			await addAbandonment({ people: selectedItem.people });
			await removeItem({ id: selectedItem.id });
			setSelectedItem(null);
		}
	};

	return (
		<>
			<div className="flex items-center pl-2 gap-8 w-full border-b border-slate-200 h-24">
				{/* Header Label */}
				<div className="flex items-center gap-3 text-slate-400 pl-2">
					<Hourglass size={32} />
				</div>

				{/* Scrollable list */}
				<div className="flex-1 flex gap-6 overflow-x-auto scrollbar-hide items-center h-full">
					{waitlistItems.map((item) => {
						const diff = Date.now() - item.createdAt;
						const minutes = Math.floor(diff / 60000);
						const isWarning = minutes > 10;

						return (
							<button
								type="button"
								key={item._id}
								onClick={() =>
									setSelectedItem({ id: item._id, people: item.people })
								}
								className="shrink-0 flex items-center bg-white rounded-2xl p-4 shadow-md border border-slate-200 min-w-[160px] justify-between h-12 hover:bg-red-50 transition-colors group cursor-pointer"
							>
								<span className="flex items-center gap-2 font-bold text-slate-800 text-2xl group-hover:text-red-600 transition-colors">
									{item.people}
									<Users
										size={20}
										className="text-slate-400 group-hover:text-red-400"
									/>
								</span>
								<span
									className={cn(
										"text-lg font-semibold ml-4",
										isWarning
											? "text-red-600 font-extrabold"
											: "text-slate-500",
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

			{/* Action Modal */}
			{selectedItem && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Backdrop */}
					<div
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						onClick={() => setSelectedItem(null)}
						onKeyDown={(e) => e.key === "Escape" && setSelectedItem(null)}
					/>

					{/* Dialog */}
					<div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
						{/* Close button */}
						<button
							type="button"
							onClick={() => setSelectedItem(null)}
							className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
						>
							<X size={24} />
						</button>

						{/* Content */}
						<h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
							Marca una opción
						</h2>

						{/* Actions */}
						<div className="flex gap-4">
							<button
								type="button"
								onClick={handleAbandonment}
								className="flex-1 py-5 px-6 rounded-2xl border-2 border-slate-300 text-slate-600 font-semibold text-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors flex flex-col items-center gap-2"
							>
								<UserX size={28} />
								Abandono
							</button>
							<button
								type="button"
								onClick={handleSeated}
								className="flex-1 py-5 px-6 rounded-2xl bg-slate-900 text-white font-semibold text-lg hover:bg-slate-800 transition-colors flex flex-col items-center gap-2"
							>
								<Utensils size={28} />
								En mesa
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
