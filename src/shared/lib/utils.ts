import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatFieldErrors(errors: readonly unknown[]) {
	return errors
		.map((error) => {
			if (typeof error === "string") {
				return error;
			}

			if (error && typeof error === "object" && "message" in error) {
				const message = (error as { message?: unknown }).message;
				if (typeof message === "string") {
					return message;
				}
			}

			return "";
		})
		.filter(Boolean)
		.join(", ");
}

export function formatTimeAgo(timestamp: number) {
	const diff = Date.now() - timestamp;
	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return "Ahora";
	return `${minutes} min`;
}

export function formatSeconds(seconds: number) {
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	return `${minutes} min`;
}

export function formatHours(seconds: number) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	if (h === 0) return `${m} min`;
	return `${h}h ${m}m`;
}
