import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

const STATUS_ORDER: Record<string, number> = {
  pending: 1,
  code3: 2,
  waiting: 3,
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const tables = await ctx.db.query('tables').collect()

    // Sort by Status then by Time
    return tables.sort((a, b) => {
      const orderA = STATUS_ORDER[a.status] || 99
      const orderB = STATUS_ORDER[b.status] || 99

      if (orderA !== orderB) {
        return orderA - orderB
      }

      // Same status, sort by time (oldest first)
      return a.statusUpdatedAt - b.statusUpdatedAt
    })
  },
})

// Create only - throws if exists
export const create = mutation({
  args: {
    tableNumber: v.number(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('tables')
      .withIndex('by_number', (q) => q.eq('tableNumber', args.tableNumber))
      .first()

    if (existing) {
      throw new ConvexError(`La mesa ${args.tableNumber} ya está en la lista`)
    }

    await ctx.db.insert('tables', {
      tableNumber: args.tableNumber,
      status: args.status,
      statusUpdatedAt: Date.now(),
    })
  },
})

export const upsert = mutation({
  args: {
    tableNumber: v.number(),
    status: v.string(), // "pending" | "waiting" | "code3"
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('tables')
      .withIndex('by_number', (q) => q.eq('tableNumber', args.tableNumber))
      .first()

    const now = Date.now()

    if (existing) {
      // Update
      await ctx.db.patch(existing._id, {
        status: args.status,
        // User req: Time should not reset on status change
      })
    } else {
      // Create fallback (should be covered by create, but safe to keep)
      await ctx.db.insert('tables', {
        tableNumber: args.tableNumber,
        status: args.status,
        statusUpdatedAt: now,
      })
    }
  },
})

export const remove = mutation({
  args: {
    tableNumber: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('tables')
      .withIndex('by_number', (q) => q.eq('tableNumber', args.tableNumber))
      .first()

    if (existing) {
      await ctx.db.delete(existing._id)
    }
  },
})
