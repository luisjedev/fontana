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
			position="top-left"
			duration={1500}
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background/80 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-foreground group-[.toaster]:border-border/50 group-[.toaster]:shadow-lg p-4 flex gap-3 items-center rounded-xl !w-fit justify-center font-sans",
					title: "text-sm font-semibold",
					description: "text-xs text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium text-xs py-1.5 px-3 rounded-lg",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium text-xs py-1.5 px-3 rounded-lg",
				},
			}}
			icons={{
				success: <CircleCheckIcon className="size-5 text-emerald-500" />,
				info: <InfoIcon className="size-5 text-blue-500" />,
				warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
				error: <OctagonXIcon className="size-5 text-red-500" />,
				loading: (
					<Loader2Icon className="size-5 animate-spin text-muted-foreground" />
				),
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
