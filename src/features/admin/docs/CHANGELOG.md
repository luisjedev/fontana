# Changelog: Admin & Products Feature

## 2026-01-04 - Initial Schema Implementation
### Added
*   **Data Model (v3 Flat Model)**:
    *   `categories`: Includes `tax_percent`, `sortOrder`, and `image`.
    *   `products`: Unified table with strict `elementType` ("product", "addon", "note").
    *   `ingredients`: Base resource library.
*   **Safety**: Enforced strict `v.union(v.literal(...))` for `elementType` and `tables.status`.
*   **Removed**:
    *   `description` field from Products (Simplified data model).
    *   Prior complex logic for Modifier Groups (v1/v2) removed.

## 2026-01-05 - Allergens & Colors
### Added
*   **Schema**:
    *   `allergens`: New table for specific allergens.
    *   `ingredients`: Added `allergens` field (List of IDs).
    *   `categories`: Added `tag_color` field for UI badges.
    *   `products`: Added `ingredients` array (Array of Objects `{id, quantity}`) for consumption metrics.
*   **Removed**:
    *   `product_base_ingredients`: Deleted in favor of embedded array in `products`.

### Changed
*   **Ingredients UI**:
    *   Implemented **Edit Mode**: Reused `CreateIngredientModal` for both creation and editing.
    *   **Refactor**: Moved data fetching to parent `IngredientsView`, making `IngredientsList` a presentational component.
    *   **UX**: Added Skeleton loaders and stable keys for better loading states.
*   **Mutations**: Added `update` mutation for ingredients in `convex/ingredients.ts`.
