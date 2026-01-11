import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

const STATUS_ORDER: Record<string, number> = {
  pending: 1,
  code3: 2,
  waiting: 3,
  served: 4,
}

const tableStatusValidator = v.union(
  v.literal("pending"),
  v.literal("code3"),
  v.literal("waiting"),
  v.literal("served")
)

type TableStatus = "pending" | "code3" | "waiting" | "served"

interface TableDoc {
  status: TableStatus
  statusUpdatedAt: number
  pendingDuration?: number
  waitingDuration?: number
  paymentDuration?: number
}

/**
 * Calculate duration updates when transitioning from one status to another.
 * Returns the accumulated duration for the previous status.
 */
function calculateDurationUpdate(
  existing: TableDoc,
  now: number
): Partial<TableDoc> {
  const duration = Math.round((now - existing.statusUpdatedAt) / 1000)

  switch (existing.status) {
    case 'pending':
      return { pendingDuration: (existing.pendingDuration || 0) + duration }
    case 'waiting':
      return { waitingDuration: (existing.waitingDuration || 0) + duration }
    case 'code3':
      return { paymentDuration: (existing.paymentDuration || 0) + duration }
    default:
      return {}
  }
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
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
    status: tableStatusValidator,
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

      const now = Date.now()
      const durationUpdates = calculateDurationUpdate(existing as TableDoc, now)
      const shouldResetTimer = existing.status === 'served' && args.status !== 'served'

      await ctx.db.patch(existing._id, {
        status: args.status,
        statusUpdatedAt: now,
        ...durationUpdates,
        ...(shouldResetTimer && { timerStartTime: now }),
      })
      return { action: 'updated' }
    }

    const now = Date.now()
    await ctx.db.insert('tables', {
      tableNumber: args.tableNumber,
      status: args.status,
      statusUpdatedAt: now,
      timerStartTime: now,
    })
    return { action: 'created' }
  },
})

export const upsert = mutation({
  args: {
    tableNumber: v.number(),
    status: tableStatusValidator,
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('tables')
      .withIndex('by_number', (q) => q.eq('tableNumber', args.tableNumber))
      .first()

    const now = Date.now()

    if (existing) {
      const durationUpdates = calculateDurationUpdate(existing as TableDoc, now)
      const shouldResetTimer = existing.status === 'served' && args.status !== 'served'

      await ctx.db.patch(existing._id, {
        status: args.status,
        statusUpdatedAt: now,
        ...durationUpdates,
        ...(shouldResetTimer && { timerStartTime: now }),
      })
    } else {
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

    if (!existing) return

    const now = Date.now()
    const totalDuration = Math.round((now - existing._creationTime) / 1000)
    const currentStateDuration = Math.round((now - existing.statusUpdatedAt) / 1000)

    // Calculate final durations including time in current state
    let pendingDuration = existing.pendingDuration || 0
    let waitingDuration = existing.waitingDuration || 0
    let paymentDuration = existing.paymentDuration || 0

    if (existing.status === 'pending') pendingDuration += currentStateDuration
    else if (existing.status === 'waiting') waitingDuration += currentStateDuration
    else if (existing.status === 'code3') paymentDuration += currentStateDuration

    await ctx.db.insert('metrics_tables', {
      tableNumber: existing.tableNumber,
      day: getTodayDateString(),
      duration: totalDuration,
      pendingDuration: pendingDuration > 0 ? pendingDuration : undefined,
      waitingDuration: waitingDuration > 0 ? waitingDuration : undefined,
      paymentDuration: paymentDuration > 0 ? paymentDuration : undefined,
      endedAt: now,
    })

    await ctx.db.delete(existing._id)
  },
})
