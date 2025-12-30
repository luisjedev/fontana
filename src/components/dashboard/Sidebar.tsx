import { useMutation } from "convex/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useToastStore } from "@/lib/store/toastStore";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

type TableStatus = "pending" | "waiting" | "code3";
type SidebarMode = "mesa" | "cola";

export function Sidebar() {
	const [inputValue, setInputValue] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<TableStatus>("pending");
	const [mode, setMode] = useState<SidebarMode>("mesa");

	const { addToast } = useToastStore();

	const createTable = useMutation(api.tables.create);
	const addToWaitlist = useMutation(api.waitlist.add);

	const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const handleNumberClick = (num: number) => {
		if (inputValue.length < 3) {
			setInputValue((prev) => prev + num.toString());
		}
	};

	const handleZeroClick = () => {
		if (inputValue.length > 0 && inputValue.length < 3) {
			setInputValue((prev) => prev + "0");
		}
	};

	const handleClear = () => {
		setInputValue("");
	};

	const handleConfirm = async () => {
		if (!inputValue) {
			addToast("Introduce un número primero", "error");
			return;
		}

		try {
			if (mode === "mesa") {
				await createTable({
					tableNumber: inputValue,
					status: selectedStatus,
				});
			} else {
				// Cola
				await addToWaitlist({
					people: `${inputValue}p`,
				});
			}
			setInputValue("");
			setSelectedStatus("pending"); // Reset status to default
			addToast(
				mode === "mesa"
					? `Mesa ${inputValue} creada`
					: `Cola ${inputValue}p añadida`,
				"success",
			);
		} catch (error: any) {
			// Catch duplicate error or others
			// ConvexError data is in error.data or message usually
			const message =
				error.data || error.message || "Error al añadir. Intenta de nuevo.";
			addToast(message, "error");
		}
	};

	return (
		<div className="w-[320px] md:w-[380px] h-full flex flex-col p-6 bg-white border-r border-slate-100 shadow-sm relative z-20">
			{/* Local Toast UI Removed - using Global Toast */}

			{/* Top Toggle */}
			<div className="flex bg-slate-50 p-1 rounded-xl mb-6">
				<button
					type="button"
					onClick={() => setMode("mesa")}
					className={cn(
						"flex-1 py-2.5 text-sm font-bold rounded-lg transition-all",
						mode === "mesa"
							? "bg-slate-900 text-white shadow-md"
							: "text-slate-500 hover:text-slate-700 hover:bg-white/50",
					)}
				>
					MESA
				</button>
				<button
					type="button"
					onClick={() => setMode("cola")}
					className={cn(
						"flex-1 py-2.5 text-sm font-bold rounded-lg transition-all",
						mode === "cola"
							? "bg-slate-900 text-white shadow-md"
							: "text-slate-500 hover:text-slate-700 hover:bg-white/50",
					)}
				>
					COLA
				</button>
			</div>

			{/* Display */}
			<div className="relative mb-6">
				<div
					className={cn(
						"w-full bg-slate-50 h-16 rounded-xl border border-slate-200 flex items-center justify-center text-2xl font-semibold",
						inputValue === "" ? "text-slate-400" : "text-slate-900",
					)}
				>
					{inputValue === "" ? "0" : inputValue}
				</div>
				{inputValue !== "" && (
					<button
						type="button"
						onClick={handleClear}
						className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-slate-400/50 hover:bg-slate-400 text-white rounded-md transition-colors"
					>
						<X size={16} strokeWidth={3} />
					</button>
				)}
			</div>

			{/* Status Filters */}
			<div className={cn("flex gap-2 mb-8", mode === "cola" && "invisible")}>
				<button
					type="button"
					onClick={() => setSelectedStatus("pending")}
					className={cn(
						"flex-1 py-4 uppercase px-1 text-xs font-bold rounded-lg transition-all",
						selectedStatus === "pending"
							? "bg-blue-500 text-white shadow-blue-500/20 shadow-lg border-transparent"
							: "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
				>
					Pendiente
				</button>
				<button
					type="button"
					onClick={() => setSelectedStatus("waiting")}
					className={cn(
						"flex-1 py-2 uppercase px-1 text-xs font-bold rounded-lg transition-all",
						selectedStatus === "waiting"
							? "bg-amber-500 text-white shadow-amber-500/20 shadow-lg border-transparent"
							: "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
				>
					Esperando
				</button>
				<button
					type="button"
					onClick={() => setSelectedStatus("code3")}
					className={cn(
						"flex-1 py-2 px-1 uppercase text-xs font-bold rounded-lg transition-all",
						selectedStatus === "code3"
							? "bg-red-500 text-white shadow-red-500/20 shadow-lg border-transparent"
							: "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
				>
					Codigo 3
				</button>
			</div>

			{/* Keypad */}
			<div className="grid grid-cols-3 gap-3 mb-6">
				{numberButtons.map((num) => (
					<button
						type="button"
						key={num}
						onClick={() => handleNumberClick(num)}
						className="h-20 text-2xl font-medium text-slate-700 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
					>
						{num}
					</button>
				))}
				{/* Placeholder for alignment if needed, or put 0 in center */}
				<div />
				<button
					type="button"
					onClick={handleZeroClick}
					className="h-20 text-2xl font-medium text-slate-700 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
				>
					0
				</button>
				<div />
			</div>

			{/* Confirm Button */}
			<div className="mt-auto">
				<button
					type="button"
					onClick={handleConfirm}
					className="w-full py-6 bg-slate-900 text-white text-sm font-bold tracking-wide rounded-2xl shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
				>
					CONFIRMAR
				</button>
			</div>
		</div>
	);
}
