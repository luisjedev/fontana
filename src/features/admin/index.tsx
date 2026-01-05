import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/features/admin/components/sidebar";

export function AdminView() {
	return (
		<main className="flex h-screen w-full bg-background overflow-hidden">
			<Sidebar />
			<div className="flex-1 overflow-auto bg-muted/20">
				<div className="h-full">
					<Outlet />
				</div>
			</div>
		</main>
	);
}
