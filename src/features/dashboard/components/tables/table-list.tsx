import { TableCircle } from "@/features/dashboard/components/tables/table-circle";
import { formatTimeAgo } from "@/shared/lib/utils";
import type { Table, TableStatus } from "@/shared/types";

interface TableListProps {
	tables: Table[];
	onTableClick: (tableNumber: number) => void;
}

const WARNING_THRESHOLD_MINUTES = 10;

export function TableList({ tables, onTableClick }: TableListProps) {
	return (
		<div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-6">
			{tables.map((t) => {
				const startTime = t.timerStartTime || t._creationTime;
				const minutes = Math.floor((Date.now() - startTime) / 60000);
				const isServed = t.status === "served";

				return (
					<div key={t._id} className="flex justify-center">
						<TableCircle
							number={t.tableNumber}
							status={t.status as TableStatus}
							time={isServed ? undefined : formatTimeAgo(startTime)}
							isWarning={!isServed && minutes > WARNING_THRESHOLD_MINUTES}
							onClick={() => onTableClick(t.tableNumber)}
						/>
					</div>
				);
			})}
		</div>
	);
}
