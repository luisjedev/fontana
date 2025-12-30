import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const add = mutation({
  args: {
    people: v.number(),
  },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split('T')[0]
    await ctx.db.insert('abandonments', {
      people: args.people,
      date: today,
    })
  },
})
