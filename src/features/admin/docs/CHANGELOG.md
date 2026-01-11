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

## 2026-01-05 - Allergens, Colors & Categories
### Added
*   **Schema**:
    *   `allergens`: New table for specific allergens.
    *   `ingredients`: Added `allergens` field (List of IDs).
    *   `categories`: Added `tag_color` field for UI badges.
    *   `products`: Added `ingredients` array (Array of Objects `{id, quantity}`) for consumption metrics.
*   **Features**:
    *   **Products Management**: Full CRUD for unified products/addons/notes.
        *   Dynamic Modal: Adapts fields based on type (Product vs Addon vs Note).
        *   Advanced List: Filtration by Name, Category, and Type.
    *   **Category Management**: Implemented full CRUD for categories with name, tax, color, and image.
    *   **Sidebar**: Added proper active state tracking for sub-routes.
*   **Removed**:
    *   `product_base_ingredients`: Deleted in favor of embedded array in `products`.

### Changed
*   **Ingredients UI**:
    *   Implemented **Edit Mode**: Reused `CreateIngredientModal` for both creation and editing.
    *   **Refactor**: Moved data fetching to parent `IngredientsView`, making `IngredientsList` a presentational component.
    *   **UX**: Added Skeleton loaders and stable keys for better loading states.
    *   **Layout**: Updated Ingredients List to use equal column widths (grid-cols-3).
*   **Mutations**: Added `update` mutation for `ingredients` and `products`.

## 2026-01-06 - Logic Refactor & Custom Hooks
### Changed
*   **Refactoring**: Extracted business logic from `create-category-modal`, `create-ingredient-modal`, and `create-product-modal` to dedicated custom hooks.
    *   `useCategoryForm`: Handles category state and mutations.
    *   `useIngredientForm`: Manages ingredient name and allergen map.
    *   `useProductForm`: Complex state machine for switching between Product/Addon/Note types and managing ingredient lists.
*   **Architecture**: Enforced separation of concerns. UI components now purely render view state provided by hooks.

## 2026-01-11 - Category Modal Crash Fix
### Fixed
*   **Category Management**: Fixed a crash when opening the create/edit category modal caused by `FormControl` (Radix `Slot`) receiving multiple children.
*   **Category Management**: Fixed validation error rendering showing `[object Object]` instead of a human-readable message.
