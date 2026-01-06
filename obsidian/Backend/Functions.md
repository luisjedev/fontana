# ⚡️ Backend Functions

Convex functions run on the server and are the only way to interact with the database. They are located in the `convex/` directory.

## Modules

### Core Logic
- **`tables.ts`**:
    - `list`: Query all active tables.
    - `updateStatus`: Mutation to advance table workflow.
    - `assignTable`: Mutation to seat a waitlist group.
- **`waitlist.ts`**:
    - `join`: Add group to queue.
    - `leave`: Remove group (abandon).

### Admin / Catalog
- **`products.ts`**: CRUD for products.
- **`categories.ts`**: CRUD for categories.
- **`ingredients.ts`**: CRUD for ingredients.
- **`allergens.ts`**: CRUD for allergens.

### Analytics
- **`analytics.ts`**: Queries for generating reports/charts.
- **`cron_analytics.ts`**: Scheduled tasks to compute `daily_metrics` at the end of the day or periodically.

### System
- **`auth.ts`**: Auth configuration.
- **`crons.ts`**: Cron job definitions.
- **`schema.ts`**: Database definition.
