import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

const STATUS_ORDER: Record<string, number> = {
  pending: 1,
  code3: 2,
  waiting: 3,
  served: 4,
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

      // If served, sort by table number (lowest first)
      if (a.status === 'served' && b.status === 'served') {
        return a.tableNumber - b.tableNumber
      }

      // Same status, sort by timerStartTime (oldest first - ascending)
      // Fallback to _creationTime if timerStartTime is missing
      const startTimeA = a.timerStartTime || a._creationTime
      const startTimeB = b.timerStartTime || b._creationTime
      
      return startTimeA - startTimeB
    })
  },
})

// Create or Update Status
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
      if (existing.status === args.status) {
        throw new ConvexError(
          `La mesa ${args.tableNumber} ya está en la lista con ese estado`,
        )
      }

      // Update Logic (Same as Upsert)
      const now = Date.now()
      const updates: any = { status: args.status, statusUpdatedAt: now }

      // Timer Logic
      if (existing.status === 'served' && args.status !== 'served') {
        updates.timerStartTime = now
      }

      const duration = Math.round((now - existing.statusUpdatedAt) / 1000)

      if (existing.status === 'pending') {
        updates.pendingDuration = (existing.pendingDuration || 0) + duration
      } else if (existing.status === 'waiting') {
        updates.waitingDuration = (existing.waitingDuration || 0) + duration
      } else if (existing.status === 'code3') {
        updates.paymentDuration = (existing.paymentDuration || 0) + duration
      }

      await ctx.db.patch(existing._id, updates)
      return { action: 'updated' }
    }

    await ctx.db.insert('tables', {
      tableNumber: args.tableNumber,
      status: args.status,
      statusUpdatedAt: Date.now(),
      timerStartTime: Date.now(),
    })
    return { action: 'created' }
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
      const updates: any = { status: args.status, statusUpdatedAt: now }

      // Timer Logic:
      // 1. If moving FROM Served layer to any other layer -> Reset timer (New Cycle)
      if (existing.status === 'served' && args.status !== 'served') {
        updates.timerStartTime = now
      }
      // 2. If existing timerStartTime is missing (legacy/migration), set it?
      // No, frontend will fallback to _creationTime if missing.
      
      // Calculate duration spent in the PREVIOUS state
      const duration = Math.round((now - existing.statusUpdatedAt) / 1000)
      
      if (existing.status === 'pending') {
         updates.pendingDuration = (existing.pendingDuration || 0) + duration
      } else if (existing.status === 'waiting') {
         updates.waitingDuration = (existing.waitingDuration || 0) + duration
      } else if (existing.status === 'code3') {
         updates.paymentDuration = (existing.paymentDuration || 0) + duration
      } else if (existing.status === 'served') {
         // Optionally track servedDuration
         // updates.servedDuration = (existing.servedDuration || 0) + duration
      }

      // Special triggers (None for now)
      
      await ctx.db.patch(existing._id, updates)
    } else {
      // Create
      await ctx.db.insert('tables', {
        tableNumber: args.tableNumber,
        status: args.status,
        statusUpdatedAt: now,
        timerStartTime: now,
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
      const now = Date.now()
      const createdAt = existing._creationTime
      // Calculate Total Duration
      const duration = Math.round((now - createdAt) / 1000)

      // Calculate final partial duration for current state
      const currentDuration = Math.round((now - existing.statusUpdatedAt) / 1000)
      
      let pendingDuration = existing.pendingDuration || 0
      let waitingDuration = existing.waitingDuration || 0
      let paymentDuration = existing.paymentDuration || 0

      if (existing.status === 'pending') {
        pendingDuration += currentDuration
      } else if (existing.status === 'waiting') {
        waitingDuration += currentDuration
      } else if (existing.status === 'code3') {
        paymentDuration += currentDuration
      }

      // Store metric
      const today = new Date().toISOString().split('T')[0]
      await ctx.db.insert('metrics_tables', {
        tableNumber: existing.tableNumber,
        day: today,
        duration,
        pendingDuration: pendingDuration > 0 ? pendingDuration : undefined,
        waitingDuration: waitingDuration > 0 ? waitingDuration : undefined,
        paymentDuration: paymentDuration > 0 ? paymentDuration : undefined,
        endedAt: now,
      })

      await ctx.db.delete(existing._id)
    }
  },
})
