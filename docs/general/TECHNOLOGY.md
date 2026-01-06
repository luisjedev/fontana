# Technology & Architecture

> **Note**: This document defines the technical foundations of the project. It corresponds to the "Ultracite" stack and "Screaming Architecture" principles.

## 1. Tech Stack (Ultracite)
We use a modern, high-performance stack designed for speed and developer experience.

*   **Core**: React 19 (RC), Vite 7, TypeScript 5.7+
*   **Fullstack / SSR**: `@tanstack/react-start` (SSR/Hybrid ready)
*   **Routing**: `@tanstack/react-router` (File-based routing in `src/routes`)
*   **State Management**:
    *   `convex`: Backend-as-a-Service & Real-time Database.
    *   `@tanstack/react-query`: Async server state & caching.
    *   `zustand`: Lightweight global client state.
*   **Styling**:
    *   Tailwind CSS 4 (Zero-config, CSS-first).
    *   **Shadcn UI**: Component library (Radix UI + Tailwind).
    *   `lucide-react`: Icons.
*   **Quality**: `biome` for formatting and linting (`pnpm check`).

## 2. Architecture (Screaming Architecture)
The folder structure "screams" what the application does, not just what technologies it uses. We organize by **Features**, not file types.

### Directory Structure
```
src/
├── features/           # 📦 Domain Modules (Single Source of Truth)
│   ├── dashboard/      # "Table Management" feature
│   ├── analytics/      # "Metrics & Reports" feature
│   └── auth/           # "Authentication" feature
├── shared/             # 🛠️ Generic Utilities & UI
│   ├── components/ui/  # Shadcn base components (Button, Card...)
│   └── hooks/          # Generic hooks (useMobile, etc.)
├── routes/             # 🚦 App URLs (TanStack Router)
└── router.tsx          # Router configuration
```

### Key Rules
1.  **Feature Isolation**: Code related to a specific domain (e.g., `TableCard`) belongs in `src/features/<domain>/`. It should NOT be in a generic `components/` folder.
2.  **Public API**: Features should expose a `index.tsx` (barrel file) if they need to be imported by other features. Use strict boundaries.
3.  **Absolute Imports**: ALWAYS use `@/` aliases.
    *   `@/features/dashboard/...`
    *   `@/shared/components/ui/...`

## 3. Backend (Convex)
*   **Location**: `/convex` folder at root.
*   **Pattern**: Functions (Queries/Mutations) are virtually imported via `@convex/_generated/api`.
*   **Data Access**: We use `useSuspenseQuery` wrapping Convex queries for full Suspense support in React 19.

## 4. Conventions
*   **Mobile-First**: Designs must handle small screens (collapsible sidebars, drawers) by default.
*   **Strict Types**: No `any`. Biome handles strict linting.
*   **Logic Extraction**: avoid writing heavy logic inside UI components. Use **Custom Hooks** (`useFormLogic`) to encapsulate state, effects, and mutations.
