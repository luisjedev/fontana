import { X } from "lucide-react";

interface ConfirmDialogProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
}

export function ConfirmDialog({
	isOpen,
	onConfirm,
	onCancel,
	title,
	message,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
}: ConfirmDialogProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onCancel}
				onKeyDown={(e) => e.key === "Escape" && onCancel()}
			/>

			{/* Dialog */}
			<div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
				{/* Close button */}
				<button
					type="button"
					onClick={onCancel}
					className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
				>
					<X size={24} />
				</button>

				{/* Content */}
				<h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
				<p className="text-slate-600 text-lg mb-8">{message}</p>

				{/* Actions */}
				<div className="flex gap-4">
					<button
						type="button"
						onClick={onCancel}
						className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-300 text-slate-600 font-semibold text-lg hover:bg-slate-100 transition-colors"
					>
						{cancelText}
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 text-white font-semibold text-lg hover:bg-red-600 transition-colors"
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}
