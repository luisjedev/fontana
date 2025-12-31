import { UserX, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface WaitlistActionsModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onAbandon: () => void;
	onSeated: () => void;
}

export function WaitlistActionsModal({
	isOpen,
	onOpenChange,
	onAbandon,
	onSeated,
}: WaitlistActionsModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-white rounded-3xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-slate-800 text-center mb-4">
						Marca una opción
					</DialogTitle>
				</DialogHeader>

				{/* Actions */}
				<div className="flex gap-4">
					<Button
						type="button"
						variant="outline"
						onClick={onAbandon}
						className="flex-1 h-auto py-5 px-6 rounded-2xl border-2 text-slate-600 font-semibold text-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors flex flex-col items-center gap-2"
					>
						<UserX size={28} />
						Abandono
					</Button>
					<Button
						type="button"
						onClick={onSeated}
						className="flex-1 h-auto py-5 px-6 rounded-2xl bg-slate-900 text-white font-semibold text-lg hover:bg-slate-800 transition-colors flex flex-col items-center gap-2"
					>
						<Utensils size={28} />
						En mesa
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
