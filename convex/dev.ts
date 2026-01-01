import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const createUser = action({
	args: { email: v.string(), password: v.string() },
	handler: async (ctx, args) => {
		await ctx.runAction(api.auth.signIn, {
			provider: "password",
			params: {
				email: args.email,
				password: args.password,
				flow: "signUp",
			},
		});
	},
});
