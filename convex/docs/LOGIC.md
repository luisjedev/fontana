# Backend & Database Logic (Convex)

## Cloud Database
We use **Convex** as our backend-as-a-service. It handles database storage, real-time subscriptions, and serverless functions.

## Schema Overview
*   **`tables`**: Active restaurant tables.
    *   `state`: Current status (pending, served, etc.).
    *   `guests`: Number of people.
    *   `timerStartTime`: For sorting logic.
*   **`waitlist`**: Customers in queue.
    *   `name`, `guests`, `type` (indoor/outdoor).
*   **`users`**: Auth entities.
    *   Extended with `username` and `role`.

## Automated Jobs (Crons)
*   **Cleanup**: A cron job runs daily (or hourly) to soft-delete or archive old data to keep the active `tables` list clean.
    *   *Note*: Ensure this does not destroy metric data needed for historical analytics.

## API Structure
*   `query`: Read-only, reactive.
*   `mutation`: Write operations.
*   `action`: Third-party integrations (fetches, etc.).
