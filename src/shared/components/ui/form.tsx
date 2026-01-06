import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
	React.ElementRef<typeof Label>,
	React.ComponentPropsWithoutRef<typeof Label> & { error?: boolean }
>(({ className, error, ...props }, ref) => {
	return (
		<Label
			ref={ref}
			className={cn(error && "text-destructive", className)}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot> & { error?: boolean }
>(({ error, className, ...props }, ref) => {
	return (
		<Slot
			ref={ref}
			// Note: aria-invalid handling is usually done by the child input if passed props correctly,
			// but styling validation state on the slot itself isn't fully possible depending on the child.
			// However, we can clean pass classes.
			// In standard shadcn, Input handles "aria-invalid" class styling.
			// So we might just pass `aria-invalid={error}` to the child.
			aria-invalid={error}
			className={cn(className)}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	if (!children) {
		return null;
	}

	return (
		<p
			ref={ref}
			className={cn("text-sm font-medium text-destructive", className)}
			{...props}
		>
			{children}
		</p>
	);
});
FormMessage.displayName = "FormMessage";

export { FormItem, FormLabel, FormControl, FormDescription, FormMessage };
