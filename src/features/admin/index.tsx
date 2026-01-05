import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/features/admin/components/sidebar";

export function AdminView() {
	return (
		<main>
			<Sidebar />
			<div className="flex-1 p-6">
				<Outlet />
			</div>
		</main>
	);
}
