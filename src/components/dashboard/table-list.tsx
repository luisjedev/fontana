import type { Id } from "../../../convex/_generated/dataModel";
import { TableCircle } from "./table-circle";

type TableStatus = "pending" | "waiting" | "code3";

interface Table {
	_id: Id<"tables">;
	tableNumber: string;
	status: string;
	statusUpdatedAt: number;
}

interface TableListProps {
	tables: Table[];
	onTableClick: (tableNumber: string) => void;
}

export function TableList({ tables, onTableClick }: TableListProps) {
	// Helper for time inside the component or we can import if shared
	const formatTimeAgo = (timestamp: number) => {
		const diff = Date.now() - timestamp;
		const minutes = Math.floor(diff / 60000);
		if (minutes < 1) return "Ahora";
		return `${minutes} min`;
	};

	return (
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
							onClick={() => onTableClick(t.tableNumber)}
						/>
					</div>
				);
			})}
		</div>
	);
}
