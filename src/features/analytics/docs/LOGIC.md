# Analytics & Metrics Logic

## Overview
This feature aggregates and visualizes performance data. It is crucial for understanding restaurant efficiency.

## Core Metrics Definitions

### 1. Service Time (Tiempo de Atención)
*   **Goal**: Measure how fast customers are attended to.
*   **Logic**: Time elapsed from `Table Creation` (Pending) to `State Change: Served`.
*   **Target**: < 5 minutes.

### 2. Payment Time (Tiempo de Cobro)
*   **Goal**: Measure efficiency of the checkout process.
*   **Logic**: Time elapsed from `State Change: Code 3` (Bill Requested) to `Table Deletion` (Free).
*   **Target**: < 3 minutes.

### 3. Queue Activity (Daily Queue)
*   **Goal**: Identify peak hours and total saturation.
*   **Logic**: Sum of all time intervals during the day where `waitlist.length > 0`.
*   **Visualization**: Total hours/minutes per day.

### 4. Waitlist Conversion
*   **Definition**: The percentage of people on the waitlist who actually get a table.
*   **Calculation**: `(Assigned Entries / Total Entries) * 100`.
*   **Abandonment Rate**: `(Dropped Entries / Total Entries) * 100`.

## Data Architecture
*   **Real-time**: Metrics are calculated on-the-fly for the current day.
*   **Historical**: (Planned) Nightly cron job to consolidate daily stats into a `daily_metrics` table for fast historical querying.
