import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export function SignIn() {
	const { signIn } = useAuthActions();
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const emailId = useId();
	const passwordId = useId();

	return (
		<div className="w-full min-h-dvh grid lg:grid-cols-2">
			{/* Left Side - Branding (Desktop) - Unchanged */}
			<div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-black opacity-80" />
				<div className="relative z-10 flex items-center gap-2">
					<img
						src="/logo512.png"
						alt="Fontana Logo"
						className="w-8 h-8 opacity-90 bg-white rounded-full"
					/>
					<span className="text-xl font-bold tracking-tight">Fontana</span>
				</div>
				<div className="relative z-10">
					<h1 className="text-4xl font-bold tracking-tight mb-4">
						Gestión inteligente para tu restaurante.
					</h1>
					<p className="text-zinc-400 text-lg">
						Simplifica la cola, optimiza tus mesas y mejora la experiencia de
						tus clientes.
					</p>
				</div>
				<div className="relative z-10 text-sm text-zinc-500">
					&copy; {new Date().getFullYear()} Fontana. Todos los derechos
					reservados.
				</div>
			</div>

			{/* Right Side - Login Form - Improved for Mobile */}
			<div className="flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-black w-full">
				<Card className="w-full max-w-md border-none shadow-none bg-transparent lg:border lg:shadow-sm lg:bg-card">
					<CardHeader className="text-center space-y-4">
						<div className="flex justify-center mb-6 lg:hidden">
							<div className="rounded-full bg-zinc-900 p-2 shadow-lg ring-1 ring-zinc-900/10 dark:ring-white/10">
								<img
									src="/logo512.png"
									alt="Fontana Logo"
									className="w-16 h-16 bg-white rounded-full"
								/>
							</div>
						</div>
						<CardTitle className="text-3xl font-bold tracking-tight">
							Iniciar sesión
						</CardTitle>
						<CardDescription className="text-base text-zinc-600 dark:text-zinc-400">
							Introduce tus credenciales para acceder al panel.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-6"
							onSubmit={async (event) => {
								event.preventDefault();
								setError(null);
								const formData = new FormData(event.currentTarget);
								try {
									await signIn("password", formData);
									await router.navigate({ to: "/" });
								} catch (error) {
									console.error("Login failed:", error);
									setError("Credenciales incorrectas o error en el servidor.");
								}
							}}
						>
							<div className="space-y-3">
								<Label htmlFor={emailId} className="font-medium">
									Correo electrónico
								</Label>
								<Input
									id={emailId}
									name="email"
									placeholder="Introduce tu correo electrónico"
									type="email"
									required
									className="h-14 bg-white dark:bg-zinc-950 px-4 md:text-lg"
								/>
							</div>
							<div className="space-y-3">
								<Label htmlFor={passwordId} className="font-medium">
									Contraseña
								</Label>
								<div className="relative">
									<Input
										id={passwordId}
										name="password"
										type={showPassword ? "text" : "password"}
										required
										className="h-14 bg-white dark:bg-zinc-950 px-4 pr-12 md:text-lg"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-0 top-0 h-full px-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-hidden"
										aria-label={
											showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
										}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>

							{error && (
								<div className="p-3 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 rounded-md text-sm font-medium text-center border border-red-200 dark:border-red-900">
									{error}
								</div>
							)}

							<input name="flow" type="hidden" value="signIn" />

							<Button
								type="submit"
								className="w-full h-14 text-xl font-semibold mt-2 shadow-lg hover:shadow-xl transition-shadow"
								size="lg"
							>
								Entrar
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
