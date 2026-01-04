# Fontana Business Logic

> **Note**: This document provides a high-level overview of the business logic for the Fontana Finance Café application. It serves as the single source of truth for understanding "what the app does."

## 1. Core Concept
Fontana is a specialized management system designed to optimize table turnover, waitlists, and service metrics for high-traffic cafés. It focuses on speed, real-time status tracking, and data-driven decision-making.

## 2. Table Management (The Dashboard)
The core of the daily operation. Tables move through a strict lifecycle to ensure accurate metric tracking.

### Table Lifecycle States
1.  **Pending (Pendiente)**:
    *   **Trigger**: A table is created (e.g., via "New Code 5" or from Waitlist).
    *   **Meaning**: Customers are seated, but not yet attended by a waiter.
    *   **Metric**: Time spent here counts towards "Response Time".
2.  **Code 3 (Bill Requested)**:
    *   **Trigger**: Customer asks for the bill.
    *   **Meaning**: The table is about to leave. Critical to process fast to free up space.
    *   **Metric**: Time spent here is specific to "Payment Efficiency".
3.  **Waiting (Esperando)**:
    *   **Trigger**: Intermediate state (e.g., waiting for second course).
    *   **Meaning**: Table is occupied but stalled on kitchen/service.
4.  **Served (Atendida)**:
    *   **Trigger**: Waiter attends the table.
    *   **Meaning**: consumption is in progress.
    *   **Action**: Timer resets or tracks duration of stay.
5.  **Available (Free)**:
    *   **Trigger**: Table is cleared/deleted.
    *   **Meaning**: Ready for new customers.

### Key Logic
*   **Timers**: Every table has a visual timer showing how long it has been in its current state.
*   **Sorting**: Tables are prioritized (Pending > Code 3 > Waiting > Served) to draw staff attention to urgent actions.

## 3. Waitlist System
Manages the queue of customers waiting for tables during peak hours.

### Workflow
1.  **Entry**: Customer is added with Name and Party Size.
2.  **Queue**: Visual list sorted by arrival time.
3.  **Assignment**: When a table generally frees up, a waitlist entry is "converted" into a Table (State: Pending).
4.  **Abandonment**: If customers leave before being seated, they are marked as "Dropped".

## 4. Analytics & Metrics
The system calculates key performance indicators (KPIs) to improve service speed.

*   **Service Time**: Time from Seating -> First Interaction.
*   **Payment Time**: Time from Bill Request -> Table Cleared.
*   **Queue Activity**: Total daily duration with an active waitlist.
*   **Conversion Rate**: % of Waitlist entries that successfully get seated.

## 5. User Roles (Future Scope)
*   **Admin/Manager**: Analytics access, configuration.
*   **Staff**: Operational dashboards (Tables/Waitlist).
