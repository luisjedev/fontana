import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password({
			profile(params) {
				return {
					email: params.email as string,
					name: params.name as string,
					username: params.username as string,
				};
			},
		}),
	],
	session: {
		// 1 year in ms
		totalDurationMs: 1000 * 60 * 60 * 24 * 365,
		inactiveDurationMs: 1000 * 60 * 60 * 24 * 365,
	},
});
