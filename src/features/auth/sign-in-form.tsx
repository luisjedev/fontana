import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "@tanstack/react-router";

export function SignIn() {
	const { signIn } = useAuthActions();
	const router = useRouter();
	return (
		<form
			className="flex h-full justify-center flex-col gap-2 max-w-sm mx-auto p-4"
			onSubmit={async (event) => {
				event.preventDefault();
				const formData = new FormData(event.currentTarget);
				try {
					await signIn("password", formData);
					await router.navigate({ to: "/" });
				} catch (error) {
					console.error("Login failed:", error);
				}
			}}
		>
			<h3 className="text-2xl font-semibold mb-4 mx-auto">Iniciar sesión</h3>
			<input
				className="border p-2 rounded"
				name="email"
				placeholder="Correo electrónico"
				type="text"
			/>
			<input
				className="border p-2 rounded"
				name="password"
				placeholder="Contraseña"
				type="password"
			/>
			<input name="flow" type="hidden" value="signIn" />
			<button
				className="bg-slate-900 text-white font-bold p-4 rounded hover:bg-slate-800"
				type="submit"
			>
				Entrar
			</button>
		</form>
	);
}
