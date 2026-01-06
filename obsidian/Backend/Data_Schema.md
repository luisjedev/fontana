# 🗄 Backend Data Schema

The database is powered by **Convex**, a relational real-time database. Models are defined in `convex/schema.ts`.

## Core Tables

### `tables`
Represents physical restaurant tables.
- `tableNumber`: (number) The ID of the table.
- `status`: Lifecycle of the table service (`pending` -> `waiting` -> `code3` -> `served`).
- `statusUpdatedAt`: Timestamp of the last status change.
- `timerStartTime`: Reference for the visual timer.

### `waitlist`
Represents the queue of customers waiting for a table.
- `people`: Number of people in the group.

## Product Catalog Tables

### `categories`
- `name`: Category name.
- `tax_percent`: Tax calculation.
- `tag_color`: UI color.

### `products`
The main sellable entity.
- `name`, `price`.
- `categoryId`: Foreign Key to `categories`.
- `elementType`: Type of item (`product`, `addon`, `note`).
- `ingredients`: Array of `{ id, quantity }` linking to `ingredients`.

### `ingredients`
- `name`: Inventory name.
- `allergens`: Array of IDs linking to `allergens`.

### `allergens`
- `name`: Allergen name (e.g., "Gluten").

## Analytics Tables

### `metrics_tables`
Historical log of table sessions.
- Stores `duration`, `pendingDuration`, `waitingDuration`, `paymentDuration` after a table is finished.

### `metrics_daily_queue`
Daily efficiency metrics for the waitlist.
- `totalWaitDuration`, `abandonedGroups`.

### `daily_metrics`
Aggregated daily report.
- `totalTables`, `avgServiceTime`, `conversionRate`.
