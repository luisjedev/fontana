import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const createUser = action({
	args: { 
		email: v.string(), 
		password: v.string(),
		username: v.string(),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.runAction(api.auth.signIn, {
			provider: "password",
			params: {
				email: args.email,
				password: args.password,
				username: args.username,
				name: args.name,
				flow: "signUp",
			},
		});
	},
});
