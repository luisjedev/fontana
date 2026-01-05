# Global Changelog

This document tracks high-level changes to the **Business Logic** and **Architecture** of Fontana.
For detailed feature-specific changes, see the respective feature changelogs.

## [Unreleased]
### Added
*   **Analytics Dashboard**: New route and feature implementation for visualizing daily metrics.
*   **Documentation System**: Established strict `docs/` structure with English-only policy.
*   **Shared Types**: Consolidated domain types (User, Table, Ingredient, etc.) into `src/shared/types.ts` for consistent project-wide usage.
*   **Icon System**: Centralized mapping for Allergen and Ingredient icons (`lucide-react`) in `src/shared/`.

### Changed
*   **Auth Architecture**: Transitioned to `ConvexAuth` with a manual username/password flow, removing social providers.
*   **Refactor**: Migrated component structure to specific `src/features/` modules (Screaming Architecture).
*   **Table Logic**: updated timer logic for "Served" tables to better track service cycles.

## [2026-01-01] - Auth & Routing
### Added
*   **Route Protection**: Global auth guard implementation.
*   **Login Redesign**: Updated UI for mobile-first premium aesthetic.

## [2025-12-31] - Foundation
### Changed
*   **Metrics**: Clarified definition of "Average Table Time" and waitlist conversions.
*   **Architecture**: Initial adoption of "Ultracite" stack (React 19 + TanStack Start).
