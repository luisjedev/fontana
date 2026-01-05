import { Link } from "@tanstack/react-router";
import { Folder, LayoutDashboard, Package, Tag, Utensils } from "lucide-react";

const NAV_ITEMS = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		href: "/admin",
	},
	{
		label: "Categorías",
		icon: Folder,
		href: "/admin/categories",
	},
	{
		label: "Productos",
		icon: Package,
		href: "/admin/products",
	},
	{
		label: "Ingredientes",
		icon: Tag,
		href: "/admin/ingredients",
	},
];

export function Sidebar() {
	return (
		<aside className="w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col h-full">
			<div className="h-16 flex items-center px-6 gap-2 border-b border-sidebar-border/50">
				<Utensils className="h-6 w-6" />
				<span className="font-bold text-lg">Fontana</span>
			</div>

			<nav className="flex-1 p-4 space-y-1">
				{NAV_ITEMS.map((item) => (
					<Link
						key={item.href}
						to={item.href}
						className="flex items-center gap-3 px-3 py-4 rounded-md font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
						activeProps={{
							className:
								"bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]",
						}}
					>
						<item.icon className="h-4 w-4" />
						{item.label}
					</Link>
				))}
			</nav>

			{/* Optional Footer/Settings if needed, for now just spacer */}
			<div className="p-4 border-t border-(--sidebar-border)/50">
				{/* Placeholder for future user/settings */}
			</div>
		</aside>
	);
}
