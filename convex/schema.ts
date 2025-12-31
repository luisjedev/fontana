import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  tables: defineTable({
    tableNumber: v.number(), // 1, 10
    status: v.string(), // "pending" | "code3" | "waiting"
    statusUpdatedAt: v.number(),
    code3At: v.optional(v.number()), // Payment start
  })
    .index('by_number', ['tableNumber'])
    // We fetch all and sort in function often, but index helps if needed
    .index('by_status_time', ['status', 'statusUpdatedAt']),

  waitlist: defineTable({
    people: v.number(), // cantidad de personas
  }),

  metrics_tables: defineTable({
    tableNumber: v.number(),
    day: v.string(), // YYYY-MM-DD
    duration: v.number(),
    paymentDuration: v.optional(v.number()),
    endedAt: v.number(),
  }).index('by_day', ['day']),

  metrics_daily_queue: defineTable({
    day: v.string(), // YYYY-MM-DD
    totalActiveTime: v.number(),
    lastActiveStart: v.optional(v.number()), // Start of current active period
    // Conversion Metrics
    seatedPeople: v.optional(v.number()),
    seatedGroups: v.optional(v.number()),
    abandonedPeople: v.optional(v.number()),
    abandonedGroups: v.optional(v.number()),
  }).index('by_day', ['day']),
})
