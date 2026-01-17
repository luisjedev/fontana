# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fontana is a real-time restaurant table management and waitlist system. The app tracks table lifecycles (pending → waiting → served → code3/bill → cleared) and calculates service KPIs for hospitality environments.

**Production**: https://fontana-admin.netlify.app/

## Essential Commands

```bash
pnpm dev                    # Start frontend (port 3000) + Convex backend concurrently
pnpm dev:frontend           # Start only Vite frontend
npx convex dev              # Start only Convex backend sync
pnpm build                  # Production build
pnpm check                  # Biome lint + format check
pnpm test                   # Run Vitest tests
npx convex deploy           # Deploy backend to production
pnpm dlx shadcn@latest add <component>  # Add Shadcn UI component
```

**Formatting before commit**: `pnpm biome check --write src`

## Tech Stack

- **Frontend**: React 19, Vite 7, TypeScript, TanStack Start (SSR-ready framework)
- **Routing**: TanStack Router (file-based in `src/routes/`)
- **State/Data**: TanStack Query + Zustand + Convex real-time subscriptions
- **Backend**: Convex (real-time database + serverless functions in `/convex`)
- **Styling**: Tailwind CSS 4, Shadcn UI (new-york style), Lucide icons
- **Quality**: Biome (tabs, double quotes), Vitest

## Architecture: Screaming by Feature

```
src/
├── features/           # Domain modules (dashboard, analytics, admin, auth)
│   └── <feature>/
│       ├── index.tsx   # Main view/export
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       └── docs/       # Feature-local documentation
├── shared/             # Cross-cutting utilities
│   ├── components/ui/  # Shadcn base components
│   ├── lib/            # Utility functions (cn, etc.)
│   └── config/         # App configuration
├── routes/             # TanStack Router pages (file-based routing)
└── router.tsx          # Router configuration

convex/                 # Backend: queries, mutations, schema, crons
├── schema.ts           # Database schema definition
├── tables.ts           # Table management functions
├── waitlist.ts         # Waitlist management
├── analytics.ts        # Analytics queries
├── cron_analytics.ts   # Scheduled analytics aggregation
└── docs/               # Backend-specific documentation

docs/general/           # Global architecture documentation
```

### Import Aliases

- `@/*` → `./src/*`
- `@convex/*` → `./convex/*`

**Always use absolute imports**: `@/features/...`, `@/shared/...`, `@convex/...`

## Convex Backend Patterns

### Data Access (Frontend)

```tsx
// Use convexQuery wrapper with TanStack Query for suspense-enabled queries
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@convex/_generated/api";

const { data } = useSuspenseQuery(convexQuery(api.tables.list, {}));
```

### Backend Functions

```ts
// Always validate args with Convex validators
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { tableNumber: v.number(), status: v.union(v.literal("pending"), v.literal("served")) },
  handler: async (ctx, args) => { /* ... */ }
});
```

### Schema Conventions

- System fields `_id` and `_creationTime` are automatic (never add them manually)
- Use `v.id("tableName")` for foreign key references
- Add `.index()` for frequently queried fields
- See `.cursorrules` for complete validator reference

## Data Flow: Table Lifecycle

Tables follow: `pending` → `waiting` → `served` → `code3` (bill) → deleted

- `statusUpdatedAt` tracks when status last changed
- Duration fields accumulate time per state: `pendingDuration`, `waitingDuration`, `paymentDuration`
- `timerStartTime` tracks current visual timer cycle

## Documentation Pattern

This project uses **Co-located (Fractal) Documentation**:

- **Global docs**: `docs/general/` (BUSINESS_LOGIC.md, TECHNOLOGY.md, CHANGELOG.md)
- **Feature docs**: `src/features/<feature>/docs/`
- **Backend docs**: `convex/docs/`

Update relevant LOGIC.md or CHANGELOG.md when modifying features.

## Code Style

- **Biome**: Tabs for indentation, double quotes for strings
- **Strict TypeScript**: No `any` types
- **Mobile-first**: All layouts must work on small screens
- Extract heavy state/effects into `hooks/use-*.ts` files

## Agent Skills

- **React Best Practices**: See `docs/skills/REACT_BEST_PRACTICES.md` for 45 performance optimization rules from Vercel Engineering. Reference when writing/reviewing React components, data fetching, or optimizing bundle size.
