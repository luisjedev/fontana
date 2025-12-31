import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl p-6 grid grid-cols-[min-content_1fr] gap-6 items-center rounded-2xl w-full justify-around",
					title: "text-xl font-bold font-sans",
					description: "text-lg text-muted-foreground font-sans",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-bold",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-bold",
				},
			}}
			icons={{
				success: <CircleCheckIcon className="size-8 text-emerald-500" />,
				info: <InfoIcon className="size-8 text-blue-500" />,
				warning: <TriangleAlertIcon className="size-8 text-amber-500" />,
				error: <OctagonXIcon className="size-8 text-red-500" />,
				loading: <Loader2Icon className="size-8 animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
