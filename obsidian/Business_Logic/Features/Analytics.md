# 📈 Analytics Feature

**Location**: `src/features/analytics`

The Analytics module tracks performance metrics to optimize restaurant efficiency.

## Metrics Tables

### 1. `metrics_tables`
Logs the performance of every single table session.
- **Key Metrics**:
    - `duration`: Total time occupied.
    - `pendingDuration`: Time waiting to order.
    - `waitingDuration`: Time waiting for food.
    - `paymentDuration`: Time spent paying.

### 2. `metrics_daily_queue`
Logs queue efficiency per day.
- **Key Metrics**:
    - `totalActiveTime`: Time the restaurant had a queue.
    - `abandonedGroups`: Customers who left before seating.

### 3. `daily_metrics` (Aggregated)
This table stores pre-calculated daily summaries to speed up reporting.
- `avgServiceTime`
- `tableTurnoverRate` (implied via `totalTables`)
- `conversionRate`

## Logic
- **Real-time**: When a table changes status, the duration of the *previous* status is calculated (Current Time - `statusUpdatedAt`) and added to the cumulative counter in `tables`.
- **Termination**: When a table is cleared (`served` -> Free), the session is finalized and written to `metrics_tables`.
