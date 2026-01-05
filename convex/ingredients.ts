import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const ingredients = await ctx.db.query("ingredients").collect();
    
    let result = ingredients;
    
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      result = result.filter(i => 
        i.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by name case-insensitive
    return result.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    allergens: v.array(v.id("allergens")),
  },
  handler: async (ctx, args) => {
    const ingredientId = await ctx.db.insert("ingredients", {
      name: args.name,
      allergens: args.allergens,
    });
    return ingredientId;
  },
});

export const update = mutation({
  args: {
    id: v.id("ingredients"),
    name: v.string(),
    allergens: v.array(v.id("allergens")),
    kitchenName: v.optional(v.string()), // Added kitchenName just in case, though not in form yet
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      allergens: args.allergens,
      ...(args.kitchenName !== undefined && { kitchenName: args.kitchenName }),
    });
  },
});
