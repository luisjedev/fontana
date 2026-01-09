# 📊 Dashboard Feature

**Location**: `src/features/dashboard`

The Dashboard is the operational heart of the application, used by staff during service.

## Key Components

### 1. Table Management
- **Table Grid/List**: visualization of all active tables.
- **State management**:
    - Each table has a `status` field (`pending`, `code3`, `waiting`, `served`).
    - **Timer**: A visual timer indicating how long a table has been in the current state.

### 2. Waitlist
- Simple counter or list of groups waiting for a table.
- Functionality to "seat" a group finds the next available table or assigns a specific one.

### 3. Responsive Layout
- **Desktop**: Split view. Sidebar for navigation/actions, Main Panel for the Table Grid.
- **Mobile**:
    - **Toggle View**: Users switch between a "Keypad" (for quick entry) and "List" (for overview).
    - Optimized hit targets for touch interfaces.

## Data Model References
- Backed by `tables` table in Convex.
- Updates `metrics_tables` for historical data.
