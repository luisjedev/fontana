import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TableCircle } from "./TableCircle";
import { WaitlistBar } from "./WaitlistBar";

type TableStatus = "pending" | "waiting" | "code3" | "free";

interface TableData {
	num: string;
	status: TableStatus;
	time: string;
}

export function MainPanel() {
	const [tables, setTables] = useState<TableData[]>([
		{ num: "1", status: "pending", time: "2 min" },
		{ num: "5", status: "pending", time: "Now" },
		{ num: "6", status: "pending", time: "2 min" },
		{ num: "10", status: "pending", time: "Now" },
		{ num: "11", status: "pending", time: "2 min" },

		{ num: "15", status: "pending", time: "Now" },
		{ num: "2", status: "waiting", time: "15 min" },
		{ num: "4", status: "waiting", time: "45 min" },
		{ num: "7", status: "waiting", time: "15 min" },
		{ num: "9", status: "waiting", time: "45 min" },

		{ num: "12", status: "waiting", time: "15 min" },
		{ num: "14", status: "waiting", time: "45 min" },
		{ num: "3", status: "free", time: "" },
		{ num: "8", status: "free", time: "" },
		{ num: "13", status: "free", time: "" },
	]);

	const [selectedTableNum, setSelectedTableNum] = useState<string | null>(null);

	const activeTable = tables.find((t) => t.num === selectedTableNum);

	const handleStatusChange = (newStatus: TableStatus) => {
		if (!selectedTableNum) return;
		setTables((prev) =>
			prev.map((t) =>
				t.num === selectedTableNum ? { ...t, status: newStatus } : t,
			),
		);
		// Keep modal open or close? Usually close if simple selection, but let's keep open for potential other edits or explicit close.
		// User asked to open modal with options.
		// Let's assume clicking status updates it immediately.
	};

	const handleRelease = () => {
		if (!selectedTableNum) return;
		// User said "quitaría la mesa de la lista", which implies removing.
		setTables((prev) => prev.filter((t) => t.num !== selectedTableNum));
		setSelectedTableNum(null);
	};

	return (
		<div className="flex-1 bg-[#F8F9FC] p-8 h-full overflow-hidden flex flex-col relative">
			<WaitlistBar />

			<div className="flex-1 overflow-y-auto pr-4">
				<div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8">
					{tables.map((t) => (
						<div key={t.num} className="flex justify-center">
							<TableCircle
								number={t.num}
								status={t.status}
								time={t.time}
								onClick={() => setSelectedTableNum(t.num)}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Modal Overlay */}
			{activeTable && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
					<div className="bg-white rounded-3xl shadow-2xl w-[400px] p-6 animate-in fade-in zoom-in-95 duration-200">
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-slate-800">
								Mesa {activeTable.num}
							</h2>
							<button
								onClick={() => setSelectedTableNum(null)}
								className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
							>
								<X size={20} />
							</button>
						</div>

						{/* Status Options */}
						<div className="flex flex-col gap-3 mb-8">
							<button
								onClick={() => handleStatusChange("pending")}
								className={cn(
									"w-full py-4 px-4 rounded-xl text-left font-semibold transition-all border-2",
									activeTable.status === "pending"
										? "border-blue-500 bg-blue-50 text-blue-700"
										: "border-slate-100 bg-white text-slate-600 hover:border-slate-200",
								)}
							>
								Pendiente
							</button>
							<button
								onClick={() => handleStatusChange("waiting")}
								className={cn(
									"w-full py-4 px-4 rounded-xl text-left font-semibold transition-all border-2",
									activeTable.status === "waiting"
										? "border-yellow-400 bg-yellow-50 text-yellow-800"
										: "border-slate-100 bg-white text-slate-600 hover:border-slate-200",
								)}
							>
								Esperando
							</button>
							<button
								onClick={() => handleStatusChange("code3")}
								className={cn(
									"w-full py-4 px-4 rounded-xl text-left font-semibold transition-all border-2",
									activeTable.status === "code3"
										? "border-red-500 bg-red-50 text-red-700"
										: "border-slate-100 bg-white text-slate-600 hover:border-slate-200",
								)}
							>
								Codigo 3
							</button>
						</div>

						{/* Actions */}
						<button
							onClick={handleRelease}
							className="w-full py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 transition-colors"
						>
							Atendida
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
