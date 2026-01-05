import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const categories = await ctx.db.query("categories").collect();
    const products = await ctx.db.query("products").collect();

    // Calculate product counts
    const productCounts = new Map<string, number>();
    for (const product of products) {
      // Assuming we only count active products, or all?
      // User removed archiving usage, so likely count all valid products.
      if (product.isArchived) continue; 
      
      const count = productCounts.get(product.categoryId) || 0;
      productCounts.set(product.categoryId, count + 1);
    }
    
    // Sort logic (optional, but good for UI)
    // For now, consistent sorting by creation time or name is good.
    // Let's sort by name for now, or use the optional sortOrder if we were using it.
    // For search, we do in-memory filtering as list size is expected to be small (<100).
    // If it grows, we should use search index.
    
    let result = categories.filter((c) => !c.isArchived).map((c) => ({
      ...c,
      productCount: productCounts.get(c._id) || 0,
    }));

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      result = result.filter((c) => 
        c.name.toLowerCase().includes(searchLower)
      );
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    tax_percent: v.number(),
    tag_color: v.optional(v.string()), // Hex color code
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("categories", {
      name: args.name,
      tax_percent: args.tax_percent,
      tag_color: args.tag_color,
      image: args.image,
      isArchived: false,
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    tax_percent: v.optional(v.number()),
    tag_color: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("categories"),
  },
  handler: async (ctx, args) => {
    // Soft delete
    await ctx.db.patch(args.id, { isArchived: true });
  },
});
