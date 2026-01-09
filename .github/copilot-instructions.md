# Fontana - AI Coding Instructions

## Project Overview
Fontana is a **real-time restaurant table management and waitlist system** built with React 19 + Convex BaaS. The app tracks table lifecycles (pending → served → cleared) and calculates service KPIs.

## Tech Stack
- **Frontend**: React 19, Vite 7, TypeScript, TanStack Router (file-based), TanStack Query
- **Backend**: Convex (real-time database + functions in `/convex`)
- **Styling**: Tailwind CSS 4, Shadcn UI, Lucide icons
- **Quality**: Biome (formatting/linting), Vitest (testing)

## Essential Commands
```bash
pnpm dev              # Start frontend + Convex backend (concurrent)
pnpm check            # Biome lint + format check
pnpm test             # Run Vitest tests
npx convex deploy     # Deploy backend to production
pnpm dlx shadcn@latest add <component>  # Add Shadcn component
```

## Architecture: Screaming by Feature
```
src/features/         # Domain modules (dashboard, analytics, admin, auth)
  └─ <feature>/
      ├─ index.tsx    # Main view/export
      ├─ components/  # Feature-specific components
      └─ hooks/       # Feature-specific hooks
src/shared/           # Generic utilities
  └─ components/ui/   # Shadcn base components
src/routes/           # TanStack Router pages (file-based)
convex/               # Backend: queries, mutations, schema
```

### Key Rules
1. **Feature isolation**: Domain components live in `src/features/<domain>/`, NOT in generic folders
2. **Absolute imports only**: Use `@/features/...`, `@/shared/...`, `@convex/...`
3. **Extract logic to hooks**: Heavy state/effects belong in `hooks/use-*.ts`, not inline in components

## Convex Backend Patterns

### Data Access (Frontend → Backend)
```tsx
// Use convexQuery wrapper with TanStack Query
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

const { data } = useSuspenseQuery(convexQuery(api.tables.list, {}));
```

### Backend Functions (`/convex/*.ts`)
```ts
// Always use validators for args
export const create = mutation({
  args: { tableNumber: v.number(), status: v.union(v.literal("pending"), ...) },
  handler: async (ctx, args) => { /* ... */ }
});
```

### Schema Conventions (`/convex/schema.ts`)
- System fields `_id`, `_creationTime` are automatic (don't add them)
- Use `v.id("tableName")` for foreign keys
- Add `.index()` for frequently queried fields

## Component Patterns

### Adding Shadcn Components
```bash
pnpm dlx shadcn@latest add button dialog form
```
Components are installed to `src/shared/components/ui/`.

### Modal/Dialog Pattern
Use `@radix-ui/react-dialog` via Shadcn's Dialog. Manage open state at parent level:
```tsx
const [isOpen, setIsOpen] = useState(false);
<CreateProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
```

## Coding Standards
- **No `any`**: Use strict TypeScript
- **Biome formatting**: Tabs, double quotes (`pnpm check` before commit)
- **Mobile-first**: All layouts must work on small screens
- **Test files**: `test/units/` mirroring `src/` structure

## Data Flow: Table Lifecycle
Tables follow: `pending` → `waiting` → `served` → `code3` (bill) → deleted
- Timers track duration per state for analytics
- Status changes accumulate `pendingDuration`, `waitingDuration`, `paymentDuration`

## Testing Guidelines
- Use `data-testid` for element selection
- Mock Convex/router when needed
- Run specific tests: `pnpm test src/features/dashboard`
