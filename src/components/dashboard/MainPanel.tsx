import { useMutation, useQuery } from "convex/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { TableCircle } from "./TableCircle";
import { WaitlistBar } from "./WaitlistBar";

type TableStatus = "pending" | "waiting" | "code3";

// Helper for time
const formatTimeAgo = (timestamp: number) => {
	const diff = Date.now() - timestamp;
	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return "Now";
	return `${minutes} min`;
};

export function MainPanel() {
	const tablesData = useQuery(api.tables.list);
	const updateTable = useMutation(api.tables.upsert);
	const removeTable = useMutation(api.tables.remove);

	// Force re-render every minute to update times
	const [, setTick] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => setTick((t) => t + 1), 60000);
		return () => clearInterval(timer);
	}, []);

	const [selectedTableNum, setSelectedTableNum] = useState<string | null>(null);

	// Safe access to tables
	const tables = tablesData || [];

	const activeTable = tables.find((t) => t.tableNumber === selectedTableNum);

	const handleStatusChange = (newStatus: TableStatus) => {
		if (!selectedTableNum) return;
		// Updates timestamp if status changes? Logic handled in backend.
		updateTable({ tableNumber: selectedTableNum, status: newStatus });
		setSelectedTableNum(null); // Auto close
	};

	const handleRelease = () => {
		if (!selectedTableNum) return;
		removeTable({ tableNumber: selectedTableNum });
		setSelectedTableNum(null);
	};

	return (
		<div className="flex-1 bg-[#F8F9FC] p-8 h-full overflow-hidden flex flex-col relative">
			<WaitlistBar />

			<div className="flex-1 overflow-y-auto pr-4">
				<div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8">
					{tables.map((t) => {
						const diff = Date.now() - t.statusUpdatedAt;
						const minutes = Math.floor(diff / 60000);
						const isWarning = minutes > 10;
						return (
							<div key={t._id} className="flex justify-center">
								<TableCircle
									number={t.tableNumber}
									status={t.status as TableStatus}
									time={formatTimeAgo(t.statusUpdatedAt)}
									isWarning={isWarning}
									onClick={() => setSelectedTableNum(t.tableNumber)}
								/>
							</div>
						);
					})}
				</div>
			</div>

			{/* Modal Overlay */}
			{activeTable && (
				<div
					className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
					onClick={() => setSelectedTableNum(null)}
				>
					<div
						className="bg-white rounded-3xl shadow-2xl w-[400px] p-6 animate-in fade-in zoom-in-95 duration-200"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-slate-800">
								Mesa {activeTable.tableNumber}
							</h2>
							<button
								type="button"
								onClick={() => setSelectedTableNum(null)}
								className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
							>
								<X size={20} />
							</button>
						</div>

						{/* Status Options */}
						<div className="flex flex-col gap-3 mb-8">
							{activeTable.status !== "pending" && (
								<button
									type="button"
									onClick={() => handleStatusChange("pending")}
									className="w-full py-4 px-4 rounded-xl text-left font-semibold transition-all border-2 border-slate-100 bg-white text-slate-600 hover:border-slate-200"
								>
									Pendiente
								</button>
							)}
							{activeTable.status !== "waiting" && (
								<button
									type="button"
									onClick={() => handleStatusChange("waiting")}
									className="w-full py-4 px-4 rounded-xl text-left font-semibold transition-all border-2 border-slate-100 bg-white text-slate-600 hover:border-slate-200"
								>
									Esperando
								</button>
							)}
							{activeTable.status !== "code3" && (
								<button
									type="button"
									onClick={() => handleStatusChange("code3")}
									className="w-full py-4 px-4 rounded-xl text-left font-semibold transition-all border-2 border-slate-100 bg-white text-slate-600 hover:border-slate-200"
								>
									Codigo 3
								</button>
							)}
						</div>

						{/* Actions */}
						<button
							type="button"
							onClick={handleRelease}
							className="w-full py-3 border border-emerald-500 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 transition-colors"
						>
							{activeTable.status === "code3" ? "Cobrada" : "Atendida"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
