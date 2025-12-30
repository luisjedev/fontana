import { useMutation, useQuery } from "convex/react";
import { Banknote, ChevronUp, HandPlatter, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { TableCircle } from "./TableCircle";
import { WaitlistBar } from "./WaitlistBar";

type TableStatus = "pending" | "waiting" | "code3";

// Helper for time
const formatTimeAgo = (timestamp: number) => {
	const diff = Date.now() - timestamp;
	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return "Ahora";
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
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

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

	const handleScroll = () => {
		if (scrollRef.current) {
			setShowScrollIndicator(scrollRef.current.scrollTop > 50);
		}
	};

	const scrollToTop = () => {
		scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="flex-1 bg-[#F8F9FC] h-full overflow-hidden flex flex-col relative">
			<WaitlistBar />

			{/* Scroll to Top Indicator */}
			{showScrollIndicator && (
				<button
					type="button"
					onClick={scrollToTop}
					className="absolute top-30 right-0 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow animate-bounce"
				>
					<ChevronUp size={28} className="text-slate-600" />
				</button>
			)}

			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className="flex-1 overflow-y-auto p-6"
			>
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
						className="bg-white rounded-3xl shadow-2xl w-[300px] p-6 animate-in fade-in zoom-in-95 duration-200"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="relative flex justify-center items-center mb-6">
							<h2 className="text-2xl font-bold text-slate-800">
								Mesa {activeTable.tableNumber}
							</h2>
							<button
								type="button"
								onClick={() => setSelectedTableNum(null)}
								className="absolute right-0 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
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
									className="w-full py-4 px-4 rounded-xl font-semibold transition-all bg-blue-500 text-white shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3"
								>
									<HandPlatter size={24} />
									<span>Pendiente</span>
								</button>
							)}
							{activeTable.status !== "waiting" && (
								<button
									type="button"
									onClick={() => handleStatusChange("waiting")}
									className="w-full py-4 px-4 rounded-xl font-semibold transition-all bg-amber-500 text-white shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3"
								>
									<Users size={24} />
									<span>Esperando</span>
								</button>
							)}
							{activeTable.status !== "code3" && (
								<button
									type="button"
									onClick={() => handleStatusChange("code3")}
									className="w-full py-4 px-4 rounded-xl font-semibold transition-all bg-red-500 text-white shadow-lg shadow-red-500/20 flex items-center justify-center gap-3"
								>
									<Banknote size={24} />
									<span>Codigo 3</span>
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
