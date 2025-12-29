import { TableCircle } from "./TableCircle";
import { WaitlistBar } from "./WaitlistBar";

export function MainPanel() {
	const tables = [
		{ num: "01", status: "pending", time: "2 min" },
		{ num: "05", status: "pending", time: "Now" },
		{ num: "06", status: "pending", time: "2 min" },
		{ num: "10", status: "pending", time: "Now" },
		{ num: "11", status: "pending", time: "2 min" },

		{ num: "15", status: "pending", time: "Now" },
		{ num: "02", status: "waiting", time: "15 min" },
		{ num: "04", status: "waiting", time: "45 min" },
		{ num: "07", status: "waiting", time: "15 min" },
		{ num: "09", status: "waiting", time: "45 min" },

		{ num: "12", status: "waiting", time: "15 min" },
		{ num: "14", status: "waiting", time: "45 min" },
		{ num: "03", status: "free", time: "" },
		{ num: "08", status: "free", time: "" },
		{ num: "13", status: "free", time: "" },
	];

	return (
		<div className="flex-1 bg-[#F8F9FC] p-8 h-full overflow-hidden flex flex-col">
			<WaitlistBar />

			<div className="flex-1 overflow-y-auto pr-4">
				<div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8">
					{tables.map((t) => (
						<div key={t.num} className="flex justify-center">
							<TableCircle
								number={t.num}
								status={t.status as any}
								time={t.time}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
