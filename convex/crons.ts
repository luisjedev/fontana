import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Clean up after lunch shift (15:00 Europe/Madrid -> 14:00 UTC)
crons.daily(
  "cleanup-lunch",
  { hourUTC: 14, minuteUTC: 0 },
  internal.maintenance.dailyCleanup
);

// Clean up after dinner shift (23:00 Europe/Madrid -> 22:00 UTC)
crons.daily(
  "cleanup-dinner",
  { hourUTC: 21, minuteUTC: 0 },
  internal.maintenance.dailyCleanup
);

// Consolidate Daily Metrics (22:00 Europe/Madrid -> 21:00 UTC)
crons.daily(
  "consolidate-daily-metrics",
  { hourUTC: 21, minuteUTC: 0 },
  internal.cron_analytics.consolidateMetrics
);

export default crons;

