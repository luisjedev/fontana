# 🏰 Architecture

Fontana follows a **Screaming Architecture** pattern (also related to Feature-Sliced Design concepts), where the folder structure screams "What the app does" rather than strict technical layers.

## Directory Structure

```text
src/
├── features/           # 📦 Functionality Modules (Domain)
│   ├── dashboard/      # 'Dashboard' feature (POS, Tables)
│   ├── admin/          # 'Admin' feature (Products, Categories)
│   └── auth/           # Authentication feature
├── shared/             # 🛠 Utilities and Shared Components
│   ├── components/ui/  # Shadcn base components (Button, Dialog, etc.)
│   ├── config/         # Global configs
│   └── hooks/          # Generic hooks (useMobile, etc.)
├── routes/             # 🚦 App Routes (File-based)
└── styles.css          # Global styles (Tailwind 4 + Variables)
```

## Core Principles

### 1. Feature Isolation
Code related to a specific business feature stays within `src/features/<feature-name>`.
- **Goal**: If you delete the `dashboard` folder, you delete the dashboard feature entirely, without leaving orphan code elsewhere.
- **Rule**: Features should not deeply import from other features. Use the public `index.tsx` (Barrel file) if cross-feature communication is strictly necessary, or move shared logic to `src/shared`.

### 2. Shared Kernel (`src/shared`)
Contains code verified to be generic and reusable across the entire application.
- UI library (Shadcn).
- Generic helpers (Dates, strings).
- Global hooks.

### 3. Layouts & Routing (`src/routes`)
- **TanStack Router** manages the URL and Layouts.
- `__root.tsx`: The main wrapper (Providers, Global Layout).
- `_authenticated.tsx`: Protected route wrapper.

## Co-located Documentation
We follow a **Fractal Documentation** pattern.
- Global logic is documented here (Obsidian).
- Feature-specific logic (detailed flows) effectively lives in `src/features/<feature>/docs/LOGIC.md` (as per project rules), but this Obsidian vault serves as the centralized knowledge base.
