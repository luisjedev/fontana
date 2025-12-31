import { query } from './_generated/server'

export const getTodayMetrics = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0]

    // 1. Fetch Daily Queue Metrics
    const queueMetric = await ctx.db
      .query('metrics_daily_queue')
      .withIndex('by_day', (q) => q.eq('day', today))
      .first()

    // 2. Fetch Table Metrics for today
    const tableMetrics = await ctx.db
      .query('metrics_tables')
      .withIndex('by_day', (q) => q.eq('day', today))
      .collect()

    // --- Calculations ---

    // A. Service & Payment Time
    let totalServiceTime = 0
    let totalPaymentTime = 0
    let paymentCount = 0

    for (const m of tableMetrics) {
      totalServiceTime += m.duration
      if (m.paymentDuration) {
        totalPaymentTime += m.paymentDuration
        paymentCount++
      }
    }

    const avgServiceTime =
      tableMetrics.length > 0
        ? Math.round(totalServiceTime / tableMetrics.length)
        : 0

    const avgPaymentTime =
      paymentCount > 0 ? Math.round(totalPaymentTime / paymentCount) : 0

    // B. Queue Conversion
    const seated = queueMetric?.seatedGroups || 0
    const abandoned = queueMetric?.abandonedGroups || 0
    const totalGroups = seated + abandoned
    const conversionRate =
      totalGroups > 0 ? Math.round((seated / totalGroups) * 100) : 0

    // C. Active Queue Time
    const activeQueueTime = queueMetric?.totalActiveTime || 0
    // If queue is currently active, we could dynamically add current diff,
    // but for simplicity we show stored value. Ideally client can add live diff if lastActiveStart is present.
    // For now, let's just return what is stored.

    return {
      avgServiceTime, // seconds
      avgPaymentTime, // seconds
      conversionRate, // percentage (0-100)
      activeQueueTime, // seconds
      // Raw counts for UI if needed
      totalTables: tableMetrics.length,
      waitlistGroups: {
        seated,
        abandoned,
      },
      lastActiveStart: queueMetric?.lastActiveStart // To animate/live update in frontend
    }
  },
})
