# 📏 Coding Conventions

Standards to maintain a clean and scalable codebase.

## Formatting & Linting
We use **Biome** for all formatting and linting tasks.
- **Run Check**: `pnpm biome check --write src`
- **Rule**: Never commit code with lint errors or unformatted files.

## Naming Conventions
- **Feature Folders**: kebab-case (`dashboard`, `admin-products`).
- **Files**: kebab-case (`data-table.tsx`, `use-mobile.ts`).
- **Components**: PascalCase inside the file (`export function DataTable...`).
- **Hooks**: camelCase starting with use (`useMobile`).

## Imports
Always use Absolute Paths (`@/`).
```ts
// ✅ Correct
import { Button } from "@/shared/components/ui/button";

// ❌ Avoid
import { Button } from "../../../shared/components/ui/button";
```

## Git Commits
Follow Conventional Commits (optional but recommended).
- `feat: add product table`
- `fix: resolve hydration error`
- `docs: update obsidian vault`
