import { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { WaitlistActionsModal } from "./waitlist-actions-modal";
import { WaitlistList } from "./waitlist-list";

export function WaitlistBar() {
	const waitlistItems = useQuery(api.waitlist.list) || [];
	const removeItem = useMutation(api.waitlist.remove);
	const addAbandonment = useMutation(api.abandonments.add);
	const [selectedItem, setSelectedItem] = useState<Doc<"waitlist"> | null>(
		null,
	);

	if (waitlistItems.length === 0) return null;

	const handleSeated = async () => {
		if (selectedItem) {
			await removeItem({ id: selectedItem._id });
			setSelectedItem(null);
		}
	};

	const handleAbandonment = async () => {
		if (selectedItem) {
			await addAbandonment({ people: selectedItem.people });
			await removeItem({ id: selectedItem._id });
			setSelectedItem(null);
		}
	};

	return (
		<>
			<WaitlistList items={waitlistItems} onSelect={setSelectedItem} />

			<WaitlistActionsModal
				isOpen={!!selectedItem}
				onOpenChange={(open) => {
					if (!open) setSelectedItem(null);
				}}
				onAbandon={handleAbandonment}
				onSeated={handleSeated}
			/>
		</>
	);
}
