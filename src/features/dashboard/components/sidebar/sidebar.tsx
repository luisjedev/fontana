import { useNavigate } from "@tanstack/react-router";
import {
	Bell,
	CircleCheck,
	LayoutGrid,
	PieChart,
	Plus,
	ReceiptEuro,
	Users,
	Utensils,
	X,
} from "lucide-react";
import { useState } from "react";
import { useSidebarActions } from "@/features/dashboard/components/sidebar/hooks/use-sidebar-actions";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import type { SidebarMode, TableStatus } from "@/shared/types";

interface SidebarProps {
	onToggleView?: () => void;
	showToggle?: boolean;
	isOnSidebar?: boolean;
}

const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Sidebar({
	onToggleView,
	showToggle = false,
	isOnSidebar = true,
}: SidebarProps) {
	const [inputValue, setInputValue] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<TableStatus>("pending");
	const [mode, setMode] = useState<SidebarMode>("mesa");
	const navigate = useNavigate();

	const { handleConfirm: executeConfirm } = useSidebarActions();

	const handleNumberClick = (num: number) => {
		if (inputValue.length < 3) {
			setInputValue((prev) => `${prev}${num}`);
		}
	};

	const handleZeroClick = () => {
		if (inputValue.length > 0 && inputValue.length < 3) {
			setInputValue((prev) => `${prev}0`);
		}
	};

	const handleClear = () => {
		setInputValue("");
	};

	const handleConfirm = async () => {
		await executeConfirm({
			mode,
			inputValue,
			selectedStatus,
			onSuccess: () => {
				setInputValue("");
				setSelectedStatus("pending"); // Reset status to default
			},
		});
	};

	return (
		<div className="w-full bg-blue-50 justify-center md:w-[380px] h-full flex flex-col px-6 py-4 md:p-6 shadow-sm relative z-20 overflow-hidden">
			{/* Local Toast UI Removed - using Global Toast */}

			{/* Top Toggle */}
			<Tabs
				value={mode}
				onValueChange={(v) => setMode(v as SidebarMode)}
				className="w-full mb-2 border-2 border-slate-200 rounded-lg"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="mesa"
						className="gap-2 font-bold data-[state=inactive]:text-slate-400"
					>
						<Utensils size={18} />
						MESA
					</TabsTrigger>
					<TabsTrigger
						value="cola"
						className="gap-2 font-bold data-[state=inactive]:text-slate-400"
					>
						<Users size={18} />
						COLA
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* Display */}
			<div className="relative mb-4">
				<div
					className={cn(
						"w-full bg-slate-50 h-14 rounded-xl border border-slate-200 flex items-center justify-center text-2xl font-semibold relative",
						inputValue === "" ? "text-slate-400" : "text-slate-900 bg-white",
					)}
				>
					<span className="absolute left-4 text-xs font-bold text-slate-400 uppercase tracking-wide">
						{mode === "mesa" ? "Nº Mesa" : "Nº Personas"}
					</span>
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
			<div
				className={cn(
					"grid grid-cols-4 gap-2 mb-4",
					mode === "cola" && "invisible",
				)}
			>
				<Button
					type="button"
					variant="outline"
					onClick={() => setSelectedStatus("pending")}
					className={cn(
						"flex-1 h-auto py-5 border rounded-xl transition-all flex items-center justify-center",
						selectedStatus === "pending"
							? "bg-blue-500 text-white border-transparent hover:bg-blue-600 hover:text-white"
							: "text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
					title="Pendiente"
				>
					<Bell size={24} className="size-6" strokeWidth={2.5} />
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => setSelectedStatus("waiting")}
					className={cn(
						"flex-1 h-auto py-5 border rounded-xl transition-all flex items-center justify-center",
						selectedStatus === "waiting"
							? "bg-amber-500 text-white border-transparent hover:bg-amber-600 hover:text-white"
							: "text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
					title="Esperando"
				>
					<Users size={24} className="size-6" strokeWidth={2.5} />
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => setSelectedStatus("served")}
					className={cn(
						"flex-1 h-auto py-5 border rounded-xl transition-all flex items-center justify-center",
						selectedStatus === "served"
							? "bg-emerald-500 text-white border-transparent hover:bg-emerald-600 hover:text-white"
							: "text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
					title="Atendida"
				>
					<CircleCheck size={24} className="size-6" strokeWidth={3} />
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => setSelectedStatus("code3")}
					className={cn(
						"flex-1 h-auto py-5 border rounded-xl transition-all flex items-center justify-center",
						selectedStatus === "code3"
							? "bg-red-500 text-white border-transparent hover:bg-red-600 hover:text-white"
							: "text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-600",
					)}
					title="Código 3"
				>
					<ReceiptEuro size={24} className="size-7" strokeWidth={2.5} />
				</Button>
			</div>

			{/* Keypad */}
			<div className="grid grid-cols-3 gap-3 mb-4">
				{numberButtons.map((num) => (
					<Button
						type="button"
						key={num}
						variant="outline"
						onClick={() => handleNumberClick(num)}
						className="h-20 text-2xl font-medium text-slate-700 border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
					>
						{num}
					</Button>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={() => navigate({ to: "/analytics" })}
					className="h-20 w-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 border-transparent rounded-2xl shadow-sm active:scale-95 transition-all flex items-center justify-center"
				>
					<PieChart size={28} />
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={handleZeroClick}
					className="h-20 text-2xl font-medium text-slate-700 border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
				>
					0
				</Button>
				{/* Toggle View Button (mobile only) or empty placeholder */}
				{showToggle ? (
					<Button
						type="button"
						variant="default"
						onClick={onToggleView}
						className="size-16 w-full h-20 bg-slate-900 text-white rounded-2xl shadow-lg active:scale-95 transition-all p-0 flex items-center justify-center"
					>
						{isOnSidebar ? <LayoutGrid size={28} /> : <Plus size={28} />}
					</Button>
				) : (
					<div />
				)}
			</div>

			{/* Confirm Button */}
			<div className="">
				<Button
					type="button"
					onClick={handleConfirm}
					className="w-full py-8 text-sm font-bold tracking-wide rounded-2xl shadow-xl hover:bg-slate-800 active:scale-95 transition-all bg-slate-900 text-white"
				>
					CONFIRMAR
				</Button>
			</div>
		</div>
	);
}
