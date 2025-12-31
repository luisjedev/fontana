import { Coffee } from "lucide-react";

export function EmptyState() {
	return (
		<div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
			<div className="bg-white p-10 rounded-full shadow-sm mb-8 border border-slate-100">
				<Coffee size={80} className="text-slate-200" />
			</div>
			<h3 className="text-3xl font-bold text-slate-800 mb-3">
				No hay ninguna mesa
			</h3>
			<p className="text-slate-400 text-lg max-w-md mx-auto">
				Las mesas que registres aparecerán aquí para que puedas gestionarlas.
			</p>
		</div>
	);
}
