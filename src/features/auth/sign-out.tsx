import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/shared/components/ui/button";

export function SignOut() {
	const { signOut } = useAuthActions();
	return <Button onClick={() => void signOut()}>Cerrar sesión</Button>;
}
