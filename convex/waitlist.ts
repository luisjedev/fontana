import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Sort by createdAt ASC (Oldest first)
    return await ctx.db.query('waitlist').order('asc').collect()
  },
})

export const add = mutation({
  args: {
    people: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('waitlist', {
      people: args.people,
      createdAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: {
    id: v.id('waitlist'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
