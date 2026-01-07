# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fontana is a real-time table and waitlist management application for high-paced hospitality environments. It enables staff to visualize table status, manage waitlists efficiently, and track key performance metrics.

**Production URL**: https://fontana-admin.netlify.app/

## Commands

```bash
# Development (starts both frontend + Convex backend)
pnpm dev

# Frontend only (port 3000)
pnpm dev:frontend

# Convex backend only
npx convex dev

# Deploy Convex to production
npx convex deploy

# Code quality (Biome - replaces ESLint/Prettier)
pnpm check                    # Lint + format check
pnpm check --write src        # Auto-fix
pnpm format                   # Format only
pnpm lint                     # Lint only

# Build & test
pnpm build
pnpm test                     # Vitest

# Add Shadcn component
pnpm dlx shadcn@latest add <component>
```

## Tech Stack ("Ultracite")

- **Frontend**: React 19, Vite 7, TypeScript 5.7+ (strict mode)
- **Framework**: TanStack Start (SSR-ready) + TanStack Router (file-based routing in `src/routes/`)
- **Backend**: Convex (real-time BaaS) - functions in `/convex` folder
- **State**: TanStack Query (server state) + Zustand (client state)
- **Forms**: TanStack Form + Zod for validation
- **Styling**: Tailwind CSS 4, Shadcn UI (components in `src/shared/components/ui/`)
- **Code Quality**: Biome (replaces ESLint + Prettier)
- **Compiler**: React Compiler enabled via babel-plugin

## Architecture (Screaming Architecture)

```
src/
├── features/              # Domain modules (feature isolation)
│   ├── dashboard/         # Table & waitlist management
│   ├── admin/             # Admin panel (products, categories, ingredients)
│   ├── auth/              # Authentication
│   └── analytics/         # Metrics dashboard
├── shared/                # Reusable utilities
│   ├── components/ui/     # Shadcn base components
│   ├── config/            # Convex & TanStack Query providers
│   ├── hooks/             # Generic hooks
│   └── types.ts           # Shared domain types
├── routes/                # TanStack Router file-based routes
└── styles.css             # Tailwind 4 entry point

convex/                    # Backend functions & schema
├── schema.ts              # Database schema
├── tables.ts              # Table mutations/queries
├── waitlist.ts            # Waitlist operations
├── products.ts            # Product catalog
└── _generated/            # Auto-generated API types
```

### Key Principles

1. **Feature Isolation**: Domain code lives in `src/features/<domain>/`. Features expose public APIs via `index.tsx` barrel files.
2. **Absolute Imports**: Always use `@/` aliases (`@/features/...`, `@/shared/...`, `@convex/...`)
3. **No Cross-Feature Imports**: Features must not import internal components from other features
4. **Mobile-First Design**: All layouts are responsive by default

## Data Patterns

### Convex Queries with TanStack Query

```tsx
import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";

const { data } = useSuspenseQuery(convexQuery(api.tables.list, {}));
```

### Shared Types

```tsx
import type { Table, Product, Category } from "@/shared/types";
```

Types are derived from Convex `Doc<"tableName">` in `src/shared/types.ts`.

## Business Domain

### Table Lifecycle
`Pending` → `Served` → `Code3` (bill) → `Available`

- **Pending**: Customers seated, not yet attended
- **Served**: Being served
- **Code3**: Bill requested, awaiting payment
- **Waiting**: Intermediate state (waiting for course)

### Table Sorting Priority
Tables sort by urgency: Pending > Code3 > Waiting > Served (by duration in each state)

### Waitlist
Queue entries convert to tables when seated. Abandoned entries track conversion loss.

## Convex Schema Notes

- System fields `_id` and `_creationTime` are auto-generated
- Use `v` validator builder from `convex/values`
- Reference other tables with `v.id("tableName")`
- Indices defined with `.index("name", ["field1", "field2"])`
