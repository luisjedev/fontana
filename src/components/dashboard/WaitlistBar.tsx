import { useMutation, useQuery } from "convex/react";
import { Hourglass, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ConfirmDialog } from "../ui/ConfirmDialog";

export function WaitlistBar() {
	const waitlistItems = useQuery(api.waitlist.list) || [];
	const removeItem = useMutation(api.waitlist.remove);
	const [itemToRemove, setItemToRemove] = useState<{
		id: Id<"waitlist">;
		people: number;
	} | null>(null);

	if (waitlistItems.length === 0) return null;

	const formatTimeAgo = (timestamp: number) => {
		const diff = Date.now() - timestamp;
		const minutes = Math.floor(diff / 60000);
		if (minutes < 1) return "Now";
		return `${minutes} min`;
	};

	const handleConfirmRemove = async () => {
		if (itemToRemove) {
			await removeItem({ id: itemToRemove.id });
			setItemToRemove(null);
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
									setItemToRemove({ id: item._id, people: item.people })
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

			<ConfirmDialog
				isOpen={itemToRemove !== null}
				onConfirm={handleConfirmRemove}
				onCancel={() => setItemToRemove(null)}
				title="¿Quitar de la cola?"
				message={`¿El grupo de ${itemToRemove?.people ?? 0} personas ya no está esperando?`}
				confirmText="Sí, quitar"
				cancelText="Cancelar"
			/>
		</>
	);
}
