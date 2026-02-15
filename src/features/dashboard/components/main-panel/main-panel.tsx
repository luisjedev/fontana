import { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EmptyState } from "@/features/dashboard/components/main-panel/empty-state";
import { TableActionsModal } from "@/features/dashboard/components/tables/table-actions-modal";
import { TableList } from "@/features/dashboard/components/tables/table-list";
import { WaitlistBar } from "@/features/dashboard/components/waitlist/waitlist-bar";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import type { TableStatus } from "@/shared/types";

interface MainPanelProps {
	tables: Doc<"tables">[] | undefined;
	waitlist: Doc<"waitlist">[] | undefined;
}

export function MainPanel({ tables: tablesData, waitlist }: MainPanelProps) {
	const updateTable = useMutation(api.tables.upsert);
	const removeTable = useMutation(api.tables.remove);

	const [, setTick] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => setTick((t) => t + 1), 60000);
		return () => clearInterval(timer);
	}, []);

	const [selectedTableNum, setSelectedTableNum] = useState<number | null>(null);
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const tables = tablesData || [];
	const activeTable = tables.find((t) => t.tableNumber === selectedTableNum);

	const handleStatusChange = (newStatus: TableStatus) => {
		if (!selectedTableNum) return;
		updateTable({ tableNumber: selectedTableNum, status: newStatus });
		setSelectedTableNum(null);
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

	const activeTables = tables.filter((t) => t.status !== "served");
	const servedTables = tables.filter((t) => t.status === "served");

	return (
		<div className="flex-1 bg-[#F8F9FC] h-full overflow-hidden flex flex-col relative">
			{/* Waitlist Bar */}
			<WaitlistBar items={waitlist} />

			{/* Scroll to Top Button */}
			{showScrollIndicator && (
				<Button
					type="button"
					onClick={scrollToTop}
					className="absolute top-30 right-0 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-sm p-3 h-auto rounded-full shadow-lg hover:shadow-xl transition-shadow animate-bounce text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-100"
				>
					<ChevronUp size={28} />
				</Button>
			)}

			{/* Tables List */}
			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className="flex-1 overflow-y-auto p-6"
			>
				{tablesData && tables.length === 0 ? (
					<EmptyState />
				) : (
					<div className="flex flex-col gap-6">
						{activeTables.length > 0 && (
							<TableList
								tables={activeTables}
								onTableClick={(num) => setSelectedTableNum(num)}
							/>
						)}

						{servedTables.length > 0 && activeTables.length > 0 && (
							<div className="flex items-center gap-4">
								<Separator className="flex-1 bg-slate-200" />
								<span className="text-xs font-bold text-emerald-600/50 uppercase tracking-widest px-2">
									Mesas Atendidas
								</span>
								<Separator className="flex-1 bg-slate-200" />
							</div>
						)}

						{servedTables.length > 0 && (
							<TableList
								tables={servedTables}
								onTableClick={(num) => setSelectedTableNum(num)}
							/>
						)}
					</div>
				)}
			</div>

			{/* Modal */}
			<TableActionsModal
				table={activeTable}
				isOpen={!!activeTable}
				onOpenChange={(open) => {
					if (!open) setSelectedTableNum(null);
				}}
				onStatusChange={handleStatusChange}
				onRelease={handleRelease}
			/>
		</div>
	);
}
