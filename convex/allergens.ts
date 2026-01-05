import { query } from "./_generated/server";

export const list = query({
	args: {},
	handler: async (ctx) => {
		const allergens = await ctx.db.query("allergens").collect();
		// Sort by name case-insensitive
		return allergens.sort((a, b) => a.name.localeCompare(b.name));
	},
});