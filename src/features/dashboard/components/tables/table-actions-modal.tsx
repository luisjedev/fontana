import type { Id } from "@convex/_generated/dataModel";
import {
	Banknote,
	CircleCheck,
	HandPlatter,
	LogOut,
	Users,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";

type TableStatus = "pending" | "waiting" | "code3" | "served";

interface Table {
	_id: Id<"tables">;
	tableNumber: number;
	status: string;
	statusUpdatedAt: number;
}

interface TableActionsModalProps {
	table: Table | null | undefined;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onStatusChange: (status: TableStatus) => void;
	onRelease: () => void;
}

export function TableActionsModal({
	table,
	isOpen,
	onOpenChange,
	onStatusChange,
	onRelease,
}: TableActionsModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xs bg-white rounded-3xl p-6">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-2xl font-bold text-slate-800 text-center">
						Mesa {table?.tableNumber}
					</DialogTitle>
					<DialogDescription className="sr-only">
						Acciones para cambiar estado de la mesa
					</DialogDescription>
				</DialogHeader>

				{table && (
					<>
						<div className="flex flex-col gap-3 mb-8">
							{table.status !== "pending" && (
								<Button
									type="button"
									onClick={() => onStatusChange("pending")}
									className="w-full py-6 text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 rounded-xl"
								>
									<HandPlatter size={24} />
									<span>Pendiente</span>
								</Button>
							)}
							{table.status !== "waiting" && (
								<Button
									type="button"
									onClick={() => onStatusChange("waiting")}
									className="w-full py-6 text-base font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3 rounded-xl"
								>
									<Users size={24} />
									<span>Esperando</span>
								</Button>
							)}
							{table.status !== "served" && (
								<Button
									type="button"
									onClick={() => onStatusChange("served")}
									className="w-full py-6 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 rounded-xl"
								>
									<CircleCheck size={24} />
									<span>Atendida</span>
								</Button>
							)}
							{table.status !== "code3" && (
								<Button
									type="button"
									onClick={() => onStatusChange("code3")}
									className="w-full py-6 text-base font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 flex items-center justify-center gap-3 rounded-xl"
								>
									<Banknote size={24} />
									<span>Codigo 3</span>
								</Button>
							)}
						</div>
						<Separator className="w-full mb-4" />
						<Button
							type="button"
							onClick={onRelease}
							className="w-full py-6 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 rounded-xl flex items-center justify-center gap-2"
						>
							<LogOut size={24} />
							<span>Liberar Mesa</span>
						</Button>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
