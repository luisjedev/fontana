import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { paginationOptsValidator } from "convex/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("ingredients")
      .withIndex("by_name")
      .order("asc")
      .collect();
  },
});

export const list = query({
  args: {
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // If there is a search query, we unfortunately fallback to "fetch all and filter"
    // because Convex doesn't support full-text search + pagination in the same efficient way 
    // without a specific Search Index, and "name" search suggests "contains", which requires full scan or Search Index.
    // For now, to keep it simple as per plan:
    // 1. If search is present -> Fetch All (limit 100 or something reasonable?) -> Filter -> Manually Paginate??
    // Actually, distinct between Search Mode (client-side filter of everything? or server side limit?) 
    // and Infinite Scroll Mode (default view).
    
    if (args.search) {
      // Fallback for search: Fetch all, filter, and return.
      // NOTE: This breaks the "pagination" contract if we try to treat it as a page. 
      // But purely for the UI, if searching, we likely want to see matches.
      // Let's stick to the prompt's request: "infinity scroll en las tablas... se vayan cargando el resto".
      // Usually search replaces the list with results. 
      // Let's implement efficiently for empty search (infinite scroll), 
      // and for search, we just return the filtered list as a "single page".
      
       const ingredients = await ctx.db.query("ingredients").collect();
       const searchLower = args.search.toLowerCase();
       const filtered = ingredients.filter(i => 
         i.name.toLowerCase().includes(searchLower)
       ).sort((a, b) => a.name.localeCompare(b.name));
       
       // Mock a paginated response so the hook is happy
       return {
         page: filtered,
         isDone: true,
         continueCursor: "",
       };
    }

    // Default Infinite Scroll Path (Efficient)
    return await ctx.db
      .query("ingredients")
      .withIndex("by_name")
      .order("asc")
      .paginate(args.paginationOpts);
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
