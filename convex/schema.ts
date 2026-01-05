import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { authTables } from "@convex-dev/auth/server";
import { type } from 'os';

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  })
    .index("by_email", ["email"])
    .index("by_username", ["username"]),

  tables: defineTable({
    tableNumber: v.number(), // 1, 10
    status: v.union(
      v.literal("pending"),
      v.literal("code3"),
      v.literal("waiting"),
      v.literal("served")
    ),
    statusUpdatedAt: v.number(),
    pendingDuration: v.optional(v.number()), // Cumulative
    waitingDuration: v.optional(v.number()), // Cumulative
    paymentDuration: v.optional(v.number()), // Cumulative
    timerStartTime: v.optional(v.number()), // Start time for the current visual timer cycle
  })
    .index('by_number', ['tableNumber'])
    // We fetch all and sort in function often, but index helps if needed
    .index('by_status_time', ['status', 'statusUpdatedAt']),

  waitlist: defineTable({
    people: v.number(), // cantidad de personas
  }),

  metrics_tables: defineTable({
    tableNumber: v.number(),
    duration: v.number(), // Total duration
    pendingDuration: v.optional(v.number()),
    waitingDuration: v.optional(v.number()),
    paymentDuration: v.optional(v.number()),
    day: v.string(), // YYYY-MM-DD
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
    totalWaitDuration: v.optional(v.number()),
  }).index('by_day', ['day']),

  daily_metrics: defineTable({
    date: v.string(), // YYYY-MM-DD
    // Aggregated Metrics
    avgServiceTime: v.number(), // Based on pendingDuration
    avgPaymentTime: v.number(), // Based on paymentDuration
    avgWaitingDuration: v.optional(v.number()), // New: Based on waitingDuration
    avgTotalDuration: v.optional(v.number()), // New: Based on full duration
    avgQueueWaitTime: v.number(), // Queue wait time (Renamed from avgWaitTime)
    // Counts
    totalTables: v.number(),
    conversionRate: v.number(),
    activeQueueTime: v.number(),
    // Details
    seatedGroups: v.number(),
    abandonedGroups: v.number(),
    seatedPeople: v.number(),
    abandonedPeople: v.number(),
  }).index('by_date', ['date']),

  // === FEATURES: PRODUCTS (CATALOG) ===

  // 1. Organization
  categories: defineTable({
    name: v.string(),
    tax_percent: v.number(), // e.g., 10 for 10%
    sortOrder: v.optional(v.number()),
    image: v.optional(v.string()), // Image URL/Storage ID
    tag_color: v.optional(v.string()), // Color for badge
    isArchived: v.optional(v.boolean()),
  }),

  allergens: defineTable({
    name: v.string(),
  }),

  // 2. Library (Ingredients/Resources)
  ingredients: defineTable({
    name: v.string(),
    kitchenName: v.optional(v.string()), // Internal name if different
    allergens: v.optional(v.array(v.id("allergens"))),
    isArchived: v.optional(v.boolean()),
  }),

  // 3. (Deleted: Logic/Rules removed for Simplicity)

  // 4. Sales Units (Unified Products)
  products: defineTable({
    name: v.string(),
    price: v.number(),
    categoryId: v.id("categories"),
    elementType: v.union(
      v.literal("product"),
      v.literal("addon"),
      v.literal("note")
    ),
    image: v.optional(v.string()), // Image URL/Storage ID
    ingredients: v.optional(v.array(v.object({
      id: v.id("ingredients"),
      quantity: v.number(),
    }))),
    isArchived: v.optional(v.boolean()),
  }).index("by_category", ["categoryId"]),

  // 5. Junctions (Relationships)
  // (Simplified: Ingredients are now embedded in products for consumption metrics)

  // (Deleted: Complexity removed)
})