import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import type {
	SidebarMode,
	TableStatus,
} from "@/features/dashboard/shared/types";

interface UseSidebarActionsProps {
	mode: SidebarMode;
	selectedStatus: TableStatus;
	inputValue: string;
	onSuccess?: () => void;
}

export function useSidebarActions() {
	const createTable = useMutation(api.tables.create);
	const addToWaitlist = useMutation(api.waitlist.add);

	const handleConfirm = async ({
		mode,
		inputValue,
		selectedStatus,
		onSuccess,
	}: UseSidebarActionsProps) => {
		if (!inputValue) {
			toast.error("Introduce un número primero");
			return;
		}

		try {
			if (mode === "mesa") {
				await createTable({
					tableNumber: inputValue,
					status: selectedStatus,
				});
				toast.success(`Mesa ${inputValue} creada`);
			} else {
				// Cola
				await addToWaitlist({
					people: Number.parseInt(inputValue, 10),
				});
				toast.success(`${inputValue} añadido a la cola`);
			}

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: unknown) {
			const message =
				error instanceof ConvexError
					? (error.data as string)
					: error instanceof Error
						? error.message
						: "Error al añadir. Intenta de nuevo.";
			toast.error(message);
		}
	};

	return {
		handleConfirm,
	};
}
