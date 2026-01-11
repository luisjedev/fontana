import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Sort by createdAt ASC (Oldest first)
    return await ctx.db.query('waitlist').order('asc').collect()
  },
})

export const add = mutation({
  args: {
    people: v.number(),
  },
  handler: async (ctx, args) => {
    const count = (await ctx.db.query('waitlist').collect()).length
    const now = Date.now()

    if (count === 0) {
      const today = getTodayDateString()
      const dailyMetric = await ctx.db
        .query('metrics_daily_queue')
        .withIndex('by_day', (q) => q.eq('day', today))
        .first()

      if (dailyMetric) {
        if (!dailyMetric.lastActiveStart) {
          await ctx.db.patch(dailyMetric._id, { lastActiveStart: now })
        }
      } else {
        await ctx.db.insert('metrics_daily_queue', {
          day: today,
          totalActiveTime: 0,
          lastActiveStart: now,
        })
      }
    }

    await ctx.db.insert('waitlist', {
      people: args.people,
    })
  },
})


export const remove = mutation({
  args: {
    id: v.id('waitlist'),
    outcome: v.optional(v.string()), // "seated" | "abandoned"
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id)
    if (!item) return // Already deleted?

    const count = (await ctx.db.query('waitlist').collect()).length
    const today = getTodayDateString()

    // Handle Conversion Metrics & Wait Duration
    if (args.outcome) {
      const dailyMetric = await ctx.db
        .query('metrics_daily_queue')
        .withIndex('by_day', (q) => q.eq('day', today))
        .first()

      if (dailyMetric) {
        const waitDuration = Math.round((Date.now() - item._creationTime) / 1000)
        let updates: any = {
          totalWaitDuration: (dailyMetric.totalWaitDuration ?? 0) + waitDuration
        }

        if (args.outcome === 'seated') {
          updates.seatedPeople = (dailyMetric.seatedPeople || 0) + item.people
          updates.seatedGroups = (dailyMetric.seatedGroups || 0) + 1
        } else if (args.outcome === 'abandoned') {
          updates.abandonedPeople = (dailyMetric.abandonedPeople || 0) + item.people
          updates.abandonedGroups = (dailyMetric.abandonedGroups || 0) + 1
        }
        await ctx.db.patch(dailyMetric._id, updates)
      } else {
         // Should exist if queue was active
      }
    }

    await ctx.db.delete(args.id)

    // Handle Active Timer (same as before)
    if (count === 1) { // Was 1, now 0
      const dailyMetric = await ctx.db
        .query('metrics_daily_queue')
        .withIndex('by_day', (q) => q.eq('day', today))
        .first()

      if (dailyMetric && dailyMetric.lastActiveStart) {
        const now = Date.now()
        const addedTime = Math.round((now - dailyMetric.lastActiveStart) / 1000)
        await ctx.db.patch(dailyMetric._id, {
          totalActiveTime: dailyMetric.totalActiveTime + addedTime,
          lastActiveStart: undefined, // Clear it
        })
      }
    }
  },
})
