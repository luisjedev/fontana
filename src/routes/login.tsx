import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/features/auth/sign-in-form";

export const Route = createFileRoute("/login")({
	component: SignIn,
});
