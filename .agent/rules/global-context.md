---
trigger: always_on
---

# 🧠 Project Context: Fontana (Finance Café)

This document serves as the main context for Antigravity agents working in this workspace. It defines the tech stack, architecture, and project rules ('Ultracite' Style).

## 1. 🏗️ Tech Stack

The project uses a modern high-performance stack:

- **Core**: React 19 (RC), Vite 7, TypeScript 5.7+
- **Fullstack / SSR**: `@tanstack/react-start` (Ready for SSR/Hybrid)
- **Routing**: `@tanstack/react-router` (File-based routing in `src/routes`)
- **State & Data Fetching**:
  - `@tanstack/react-query` (Async state management)
  - `convex` (Backend-as-a-Service, Real-time db)
  - `zustand` (Lightweight client global state)
- **Styles**:
  - Tailwind CSS 4 (Next-gen, no explicit `postcss.config.js`, direct import)
  - **Shadcn UI**: Base components in `src/shared/components/ui`
  - Icons: `lucide-react`
  - Animations: `tw-animate-css`
- **Code Quality**:
  - **Biome**: Replaces ESLint and Prettier. Commands: `pnpm biome check --write src`
- **knowlege**: uses context7 and his MCP to know which you need for doing the job

## 2. 🏰 Architecture (Screaming Architecture)

The project follows a strict modular structure oriented towards functionalities ('Features') rather than technical layers.

### Directory Structure (`src/`)

```
src/
├── features/           # 📦 Functionality Modules (Domain)
│   └── dashboard/      # Example: 'dashboard' feature
│       ├── components/ # Components exclusive to this feature
│       ├── hooks/      # Exclusive hooks
│       └── index.tsx   # Feature entry point (Barrel file)
├── shared/             # 🛠️ Utilities and Shared Components
│   ├── components/
│   │   └── ui/         # 🧱 Shadcn base components (Button, Dialog, etc.)
│   ├── config/         # Global configurations (TanStack Query, etc.)
│   └── hooks/          # Generic reusable hooks
├── routes/             # 🚦 App Routes (TanStack Router)
│   ├── __root.tsx      # Root Layout and Context providers
│   └── index.tsx       # Home route
├── router.tsx          # Router configuration
└── styles.css          # CSS Entry point (Tailwind 4)
```

### Import Rules
- **Alias `@/`**: Always use absolute aliases.
  - `@/features/...`
  - `@/shared/...` (UI components here: `@/shared/components/ui/...`)
  - `@convex/...`
- **Feature Isolation**: A feature must NOT directly import internal components from another feature. It must use the public `index.tsx` if it exists, or move specific common code to `shared`.

## 3. 💾 Backend & Data (Convex)

- **Queries/Mutations**: Defined in `/convex` folder.
- **Hooks**: Use `useSuspenseQuery` from TanStack Query with the Convex wrapper (`convexQuery`) for full Suspense and SSR streaming support.
  ```tsx
  const { data } = useSuspenseQuery(convexQuery(api.tables.list, {}));
  ```
- **MCP**: Use convex mcp for queries, getting info or manual tests with browser agent

## 4. 🎨 UI/UX & Design

- **Mobile First**: Adaptive design. The Dashboard has a dual mode:
  - Desktop: Sidebar + MainPanel visible.
  - Mobile: Toggle between Sidebar (Keypad) and MainPanel (List).
- **Theme**: Dark Mode support (`dark` classes), CSS variables defined with `oklch` in `src/styles.css`.
- **Shadcn UI**: Standard library. Customized in `components.json`.

## 5. 📜 Related Documentation
- **`functionality.md`**: Defines functional scope (Table Management, Waitlist, Statuses).

## 6. 🚀 Commands
- `pnpm dev`: Start dev server (Port 3000).
- `npx convex dev`: Start Convex dev server (local sync).
- `npx convex deploy`: Deploy Convex functions and schema to production.
- `pnpm check`: Verify linting and types with Biome.
- `pnpm build`: Build for production.