import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  tables: defineTable({
    tableNumber: v.number(), // 1, 10
    status: v.string(), // "pending" | "code3" | "waiting"
    statusUpdatedAt: v.number(),
  })
    .index('by_number', ['tableNumber'])
    // We fetch all and sort in function often, but index helps if needed
    .index('by_status_time', ['status', 'statusUpdatedAt']),

  waitlist: defineTable({
    people: v.number(), // cantidad de personas
    createdAt: v.number(),
  }).index('by_time', ['createdAt']),

  abandonments: defineTable({
    people: v.number(),
    date: v.string(), // formato "YYYY-MM-DD"
  }).index('by_date', ['date']),
})
