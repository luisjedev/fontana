import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    search: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    type: v.optional(v.string()), // "product", "addon", "note"
  },
  handler: async (ctx, args) => {
    let products = await ctx.db.query("products").collect();
    
    // Sort logic: Alphabetical by default
    products.sort((a, b) => a.name.localeCompare(b.name));

    // Filter by Archive (Active Status) - Actually user wants to manage them, so maybe we show all? 
    // Usually admin views show all, but visually distinguish.
    // Let's return all and let frontend filter if needed, OR filter out archived if not requested.
    // The previous views filtered out archived. 
    // "Active Status" toggle in modal implies isArchived = !active.
    // Let's filter out archived for the main list unless we want a "Show Archived" toggle.
    // For now, consistent with Categories, I'll filter !isArchived.
    // Wait, the "Actions" usually implies managing everything.
    // But categories implementation: `result = categories.filter((c) => !c.isArchived);`
    // So I will stick to that pattern for Consistency.
    
    let result = products.filter((p) => !p.isArchived);

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(searchLower)
      );
    }

    if (args.categoryId) {
      result = result.filter((p) => p.categoryId === args.categoryId);
    }

    if (args.type) {
        // args.type could be "all" from frontend, so check
        if (args.type !== "all") {
             result = result.filter((p) => p.elementType === args.type);
        }
    }

    return result;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    categoryId: v.id("categories"),
    elementType: v.union(v.literal("product"), v.literal("addon"), v.literal("note")),
    image: v.optional(v.string()),
    ingredients: v.optional(v.array(v.object({
      id: v.id("ingredients"),
      quantity: v.number(),
    }))),
    isActive: v.boolean(), // Map to !isArchived
  },
  handler: async (ctx, args) => {
    const { isActive, ...rest } = args;
    const id = await ctx.db.insert("products", {
        ...rest,
        isArchived: !isActive,
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    categoryId: v.optional(v.id("categories")),
    elementType: v.optional(v.union(v.literal("product"), v.literal("addon"), v.literal("note"))),
    image: v.optional(v.string()),
    ingredients: v.optional(v.array(v.object({
      id: v.id("ingredients"),
      quantity: v.number(),
    }))),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, isActive, ...rest } = args;
    const updates: any = { ...rest };
    if (isActive !== undefined) {
        updates.isArchived = !isActive;
    }
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isArchived: true });
  },
});
