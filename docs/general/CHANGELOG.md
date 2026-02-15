# Global Changelog

This document tracks high-level changes to the **Business Logic** and **Architecture** of Fontana.
For detailed feature-specific changes, see the respective feature changelogs.

## [Unreleased]
### Added
*   **Analytics Dashboard**: New route and feature implementation for visualizing daily metrics.
*   **Documentation System**: Established strict `docs/` structure with English-only policy.
*   **Shared Types**: Consolidated domain types (User, Table, Ingredient, etc.) into `src/shared/types.ts` for consistent project-wide usage.
*   **Icon System**: Centralized mapping for Allergen and Ingredient icons (`lucide-react`) in `src/shared/`.
*   **Category Management**: Complete feature implementation for managing product categories (Tax, Color, Images).
*   **React Compiler**: Integrated for automatic memoization, reducing the need for manual `useMemo`/`useCallback` optimizations.
*   **Form Standardization**: Adopted `@tanstack/react-form` + `zod` as the standard for all complex forms (Admin).

### Changed
*   **Auth Architecture**: Transitioned to `ConvexAuth` with a manual username/password flow, removing social providers.
*   **Refactor**: Migrated component structure to specific `src/features/` modules (Screaming Architecture).
*   **Table Logic**: updated timer logic for "Served" tables to better track service cycles.
*   **UI/UX**: Standardized List/Grid layouts across Admin features (Ingredients, Categories).
*   **AI Documentation**: Centralized skills, contexts, and agent workflows into `.github/copilot/` as the single Copilot-first hub.

## [2026-01-01] - Auth & Routing
### Added
*   **Route Protection**: Global auth guard implementation.
*   **Login Redesign**: Updated UI for mobile-first premium aesthetic.

## [2025-12-31] - Foundation
### Changed
*   **Metrics**: Clarified definition of "Average Table Time" and waitlist conversions.
*   **Architecture**: Initial adoption of "Ultracite" stack (React 19 + TanStack Start).
