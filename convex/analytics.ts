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
    let totalPendingDuration = 0
    let pendingCount = 0
    let totalPaymentTime = 0
    let paymentCount = 0
    let totalWaitingDuration = 0
    let waitingCount = 0
    let totalDurationSum = 0

    for (const m of tableMetrics) {
      if (m.pendingDuration) {
        totalPendingDuration += m.pendingDuration
        pendingCount++
      }
      if (m.paymentDuration) {
        totalPaymentTime += m.paymentDuration
        paymentCount++
      }
      if (m.waitingDuration) {
        totalWaitingDuration += m.waitingDuration
        waitingCount++
      }
      if (m.duration) {
        totalDurationSum += m.duration
      }
    }

    const avgServiceTime =
      pendingCount > 0
        ? Math.round(totalPendingDuration / pendingCount)
        : 0

    const avgPaymentTime =
      paymentCount > 0 ? Math.round(totalPaymentTime / paymentCount) : 0

    const avgWaitingDuration = 
      waitingCount > 0 ? Math.round(totalWaitingDuration / waitingCount) : 0

    const avgTotalDuration = 
      tableMetrics.length > 0 ? Math.round(totalDurationSum / tableMetrics.length) : 0

    // Served Duration = Total - (Pending + Waiting + Payment)
    // We calculate this per table to be accurate, or we can approximate with averages. 
    // Per table is better.
    let totalServedDuration = 0;
    for (const m of tableMetrics) {
        const p = m.pendingDuration || 0;
        const w = m.waitingDuration || 0;
        const pay = m.paymentDuration || 0;
        const d = m.duration || 0;
        // Served can't be negative
        const served = Math.max(0, d - (p + w + pay));
        totalServedDuration += served;
    }
    const avgServedDuration = tableMetrics.length > 0 ? Math.round(totalServedDuration / tableMetrics.length) : 0;


    // B. Queue Conversion
    const seated = queueMetric?.seatedGroups || 0
    const abandoned = queueMetric?.abandonedGroups || 0
    const totalGroups = seated + abandoned
    const conversionRate =
      totalGroups > 0 ? Math.round((seated / totalGroups) * 100) : 0

    // C. Active Queue Time
    const activeQueueTime = queueMetric?.totalActiveTime || 0

    // D. Average Wait Time
    const totalWaitDuration = queueMetric?.totalWaitDuration || 0
    const avgQueueWaitTime = totalGroups > 0 ? Math.round(totalWaitDuration / totalGroups) : 0

    // E. Active Sessions
    const activeSessions = await ctx.db.query("authSessions").collect();
    const validSessions = activeSessions.filter(
        (s) => s.expirationTime > Date.now()
    ).length;

    return {
      avgServiceTime, // seconds
      avgPaymentTime, // seconds
      conversionRate, // percentage (0-100)
      activeQueueTime, // seconds
      avgQueueWaitTime, // seconds (Queue Wait Time)
      avgTableWaitTime: avgServiceTime, // seconds (Table Wait Time / Pending Duration)
      avgWaitingDuration,
      avgTotalDuration,
      avgServedDuration,
      // Raw counts for UI if needed
      totalTables: tableMetrics.length,
      waitlistGroups: {
        seated,
        abandoned,
        seatedPeople: queueMetric?.seatedPeople || 0,
        abandonedPeople: queueMetric?.abandonedPeople || 0,
      },
      lastActiveStart: queueMetric?.lastActiveStart, // To animate/live update in frontend
      activeSessions: validSessions,
    }
  },
})
