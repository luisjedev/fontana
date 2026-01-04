# Dashboard Feature Logic

## Overview
The Dashboard is the operational heart of the application. It provides real-time visibility into table status and managing the customer queue (waitlist).

## Components

### 1. Main Panel (Table Grid)
*   **Purpose**: Display all active tables.
*   **Organization**:
    *   **Section 1: "Served" (Atendidas)** - Tables currently eating. Sorted by Table Number. visual separator.
    *   **Section 2: "Pending & Code 3"** - Critical tables needing attention. Sorted by urgency/wait time.
*   **Interactions**:
    *   Clicking a table opens the "Table Details" dialog/drawer.
    *   Long-press (future) for quick actions.

### 2. Sidebar (Controls)
*   **Table Creation**:
    *   **New Table**: Creates the table with the selected status.
    *   **Existing Table (Same Status)**: Shows an error (duplicate prevention).
    *   **Existing Table (Different Status)**: Updates the table's status to the new selection (e.g., changing a table from "Served" to "Code 3").
*   **Status Selection**: Icons for Pendiente (Bell), Waiting (Users), Served (Check), Code 3 (Money).
*   Waitlist Toggle: On mobile, switches view between Table Grid and Waitlist.

## Logic Details

### Table Timers
*   **Start Time**: Set when the table is created.
*   **Reset Logic**: The visible timer resets ONLY when transitioning **from** "Served" to another state (e.g., Code 3).
*   **Reasoning**: We want to track the total duration of the "Stay" once served, but track "Response Time" when pending.

### Sorting Algorithm
1.  **Priority Group**: Pending (1) > Code 3 (2) > Waiting (3) > Served (4).
    *   *Note*: "Waiting" refers to tables waiting for a specific step (e.g. second course), distinct from "Pending" (initial attention).
2.  **Secondary Sort**: Within each group, sort by `timerStartTime` (Longest waiting first).
3.  **Served Exception**: Served tables are sorted by Table Number (Ascending).

## Waitlist Integration
*   When a waitlist item is "assigned" to a table, it creates a new Table entity with the `customerName` pre-filled.
*   The original waitlist entry is marked as "completed" (or removed).
