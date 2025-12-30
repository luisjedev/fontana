import { Check, Info, X } from "lucide-react";
import { useToastStore } from "@/lib/store/toastStore";
import { cn } from "@/lib/utils";

export function ToastContainer() {
	const { toasts } = useToastStore();

	return (
		<div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={cn(
						"pointer-events-auto flex items-center gap-4 px-8 py-6 rounded-2xl shadow-xl animate-in fade-in slide-in-from-right-8 duration-300",
						toast.type === "error"
							? "bg-white border-2 border-red-100 text-red-600"
							: "bg-slate-900 text-white",
					)}
				>
					{toast.type === "error" && (
						<div className="bg-red-100 p-2 rounded-full shrink-0">
							<X size={20} strokeWidth={3} />
						</div>
					)}
					{toast.type === "success" && (
						<div className="bg-emerald-500/20 p-2 rounded-full shrink-0">
							<Check size={20} strokeWidth={3} className="text-emerald-500" />
						</div>
					)}
					{/* Default/Info style handled by the slate-900 block mostly, maybe add icon if needed or keep clean */}
					<span className="text-lg font-bold">{toast.message}</span>
				</div>
			))}
		</div>
	);
}
