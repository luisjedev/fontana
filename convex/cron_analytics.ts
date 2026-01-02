import { internalMutation } from './_generated/server'

export const consolidateMetrics = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Determine "Today"
    // Cron runs at 22:00 ES, which is 20:00/21:00 UTC. So it's still the same calendar day in UTC.
    const today = new Date().toISOString().split('T')[0]

    console.log(`[Consolidation] Starting for date: ${today}`)

    // 2. Fetch Daily Queue Metrics
    const queueMetric = await ctx.db
      .query('metrics_daily_queue')
      .withIndex('by_day', (q) => q.eq('day', today))
      .unique()

    // 3. Fetch Table Metrics for today
    const tableMetrics = await ctx.db
      .query('metrics_tables')
      .withIndex('by_day', (q) => q.eq('day', today))
      .collect()

    // 4. Calculate Metrics (Mirroring logic from analytics.ts)
    
    // A. Service & Payment Time
    let totalPendingDuration = 0
    let pendingCount = 0
    let totalPaymentTime = 0
    let paymentCount = 0

    for (const m of tableMetrics) {
      if (m.pendingDuration) {
        totalPendingDuration += m.pendingDuration
        pendingCount++
      }
      if (m.paymentDuration) {
        totalPaymentTime += m.paymentDuration
        paymentCount++
      }
    }

    const avgServiceTime =
      pendingCount > 0
        ? Math.round(totalPendingDuration / pendingCount)
        : 0

    const avgPaymentTime =
      paymentCount > 0 ? Math.round(totalPaymentTime / paymentCount) : 0

    // B. Queue Conversion
    const seatedGroups = queueMetric?.seatedGroups || 0
    const abandonedGroups = queueMetric?.abandonedGroups || 0
    const seatedPeople = queueMetric?.seatedPeople || 0
    const abandonedPeople = queueMetric?.abandonedPeople || 0
    const totalGroups = seatedGroups + abandonedGroups
    
    const conversionRate =
      totalGroups > 0 ? Math.round((seatedGroups / totalGroups) * 100) : 0

    // C. Other Metrics
    const activeQueueTime = queueMetric?.totalActiveTime || 0
    const totalWaitDuration = queueMetric?.totalWaitDuration || 0
    const avgWaitTime = totalGroups > 0 ? Math.round(totalWaitDuration / totalGroups) : 0
    const totalTables = tableMetrics.length

    // 5. Insert into daily_metrics
    // Check if exists first to avoid duplicates if run multiple times?
    // User requested "insert data in a new row". We can assume uniqueness by date.
    
    const existing = await ctx.db
        .query("daily_metrics")
        .withIndex("by_date", q => q.eq("date", today))
        .unique();

    if (existing) {
        console.log(`[Consolidation] Metrics for ${today} already exist. Updating...`);
        await ctx.db.patch(existing._id, {
            avgServiceTime,
            avgPaymentTime,
            avgWaitTime,
            totalTables,
            conversionRate,
            activeQueueTime,
            seatedGroups,
            abandonedGroups,
            seatedPeople,
            abandonedPeople,
        });
    } else {
         await ctx.db.insert('daily_metrics', {
            date: today,
            avgServiceTime,
            avgPaymentTime,
            avgWaitTime,
            totalTables,
            conversionRate,
            activeQueueTime,
            seatedGroups,
            abandonedGroups,
            seatedPeople,
            abandonedPeople,
        })
    }
   

    // 6. Cleanup (Vacuum)
    // Delete source data mainly to save space as requested.
    
    // Delete metrics_tables for today
    let deletedTablesMetrics = 0;
    for (const m of tableMetrics) {
        await ctx.db.delete(m._id)
        deletedTablesMetrics++;
    }

    // Delete metrics_daily_queue for today
    if (queueMetric) {
        await ctx.db.delete(queueMetric._id)
    }

    console.log(`[Consolidation] Completed. Saved summary. Deleted ${deletedTablesMetrics} table metrics and queue metrics for ${today}.`)
  },
})
