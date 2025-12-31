import { api } from "@convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, CreditCard, History, Users } from "lucide-react";
import { cn } from "@/shared/lib/utils";

function MetricCard({
	title,
	value,
	subtext,
	icon: Icon,
	color,
}: {
	title: string;
	value: string;
	subtext?: string;
	icon: React.ElementType;
	color: "blue" | "green" | "amber" | "red";
}) {
	const colors = {
		blue: "bg-blue-50 text-blue-600 border-blue-100",
		green: "bg-green-50 text-green-600 border-green-100",
		amber: "bg-amber-50 text-amber-600 border-amber-100",
		red: "bg-red-50 text-red-600 border-red-100",
	};

	return (
		<div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<div className={cn("p-3 rounded-2xl", colors[color])}>
					<Icon size={24} />
				</div>
				<span className="text-slate-500 font-medium text-lg">{title}</span>
			</div>
			<div>
				<div className="text-4xl font-bold text-slate-800">{value}</div>
				{subtext && (
					<div className="text-sm text-slate-400 font-medium mt-1">
						{subtext}
					</div>
				)}
			</div>
		</div>
	);
}

function formatSeconds(seconds: number) {
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	return `${minutes} min`;
}

function formatHours(seconds: number) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	if (h === 0) return `${m} min`;
	return `${h}h ${m}m`;
}

export function AnalyticsView() {
	const { data } = useSuspenseQuery(
		convexQuery(api.analytics.getTodayMetrics, {}),
	);

	return (
		<div className="h-screen w-screen bg-slate-50 p-6 flex flex-col gap-6 overflow-y-auto">
			{/* Header */}
			<div className="flex items-center gap-4 shrink-0">
				<Link
					to="/"
					className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
				>
					<ArrowLeft size={24} className="text-slate-600" />
				</Link>
				<div>
					<h1 className="text-3xl font-bold text-slate-900">
						Analíticas de Hoy
					</h1>
					<p className="text-slate-500">Métricas en tiempo real</p>
				</div>
			</div>

			{/* Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
				<MetricCard
					title="Atención Media"
					value={formatSeconds(data.avgServiceTime)}
					subtext={`${data.totalTables} mesas cerradas`}
					icon={Clock}
					color="blue"
				/>
				<MetricCard
					title="Tiempo de Cobro"
					value={formatSeconds(data.avgPaymentTime)}
					subtext="Desde petición cuenta"
					icon={CreditCard}
					color="green"
				/>
				<MetricCard
					title="Conversión Cola"
					value={`${data.conversionRate}%`}
					subtext={`${data.waitlistGroups.seated} sentados / ${data.waitlistGroups.abandoned} abandonos`}
					icon={Users}
					color="amber"
				/>
				<MetricCard
					title="Cola Activa"
					value={formatHours(data.activeQueueTime)}
					subtext="Tiempo con gente esperando"
					icon={History}
					color="red"
				/>
			</div>
		</div>
	);
}
