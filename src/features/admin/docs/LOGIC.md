# Admin Feature Logic & Architecture

## 1. Overview
The **Admin Feature** serves as the central back-office hub for managing the repository of resources for the application. It consolidates the management of Categories, Products, Ingredients, and Allergens into a unified domain.

## 2. Architecture & Structure

The feature follows a **Domain-Centric Modular Architecture**. Instead of scattering related management screens across the app, they are grouped under `features/admin` to share layout, context, and components.

### Directory Structure
```
src/features/admin/
├── components/         # Shared admin-specific UI (e.g., Sidebar, Layout)
├── docs/               # Feature-specific documentation (LOGIC.md, CHANGELOG.md)
├── ingredients/        # [Module] Ingredient & Allergen management base
├── products/           # [Module] Product Catalog (The "Menu") management
├── categories/         # [Module] Visual category organization
└── index.tsx           # Entry point (Exports AdminView)
```

### Module Roles
*   **`ingredients/`**: The base layer. Manages raw materials and dietary restrictions (Allergens). This is the source of truth for costs and composition.
*   **`products/`**: The sellable layer. Defines what appears on the POS. It references ingredients for consumption tracking.
*   **`categories/`**: The organizational layer. Defines how products are grouped in the UI.

### Internal Pattern (UI/Logic Separation)
We use a strict **Hook-Component Separation** for complex forms and logic-heavy views:
*   **Components (`components/*.tsx`)**: Pure UI. They receive data/handlers via props or use the custom hook directly if top-level. They should contain **zero** direct `useMutation` or complex `useEffect`.
*   **Hooks (`hooks/*.ts`)**: Encapsulate all business logic, state management, validations, and backend interactions (Convex).
    *   *Example*: `useProductForm` handles the state machine for Product/Addon/Note types, while `CreateProductModal` just renders inputs.

---

## 3. Data Model Strategy (v3 - "Flat & Clean")

> [!CAUTION]
> **Radical Simplification**: Previous complex rules, modifier groups, and nested constraints have been removed.
> The system adopts a **"Flat Ticket"** model where everything is a `Product` with a specific `elementType`.

### 3.1 Entities

#### A. Categories
*   Visual organization (e.g., Coffees, Extras, Kitchen Notes).
*   **Fields**: `name`, `tax_percent`, `image` (Optional), `tag_color` (Optional).

#### B. Products (Unified Table)
All sellable items or notes live here.
*   **Core Fields**: `name`, `price`, `categoryId`, `image` (Optional).
*   **Recipe (Embedded)**: `ingredients` -> Array of `{ id, quantity }`.
    *   Optimized for read performance and post-sale consumption calculation.
    *   Eliminates the need for auxiliary many-to-many tables.
*   **`elementType` (Strict Union)**:
    *   `product`: Main Item (e.g., Latte, Toast).
    *   `addon`: Add-on Item (e.g., Extra Avocado, Soy Milk). *Replaces old "modifiers"*.
    *   `note`: Instruction (e.g., No Onion, Warm Milk). *Price is usually 0*.

#### C. Base Resources
*   **Allergens**: Simple dictionary of allergens (e.g., Gluten, Dairy).
*   **Ingredients (Stock/Base)**:
    *   Used for cost definition, allergen mapping, and stock metrics.
    *   **Fields**: `name`, `allergens` (Array of IDs).
    *   Linked directly in the product's `ingredients` array.

---

## 4. Operational Workflow (Sequential Grouping)

The ordering system functions via **Implicit Association based on Input Order** (Client-side logic):

1.  **Trigger**: Waiter selects a **Main** `Product` (e.g., "Whole Wheat Toast").
    *   *System*: Opens a new "Item Block".
2.  **Addons**: Waiter selects extras (e.g., "Avocado", "Turkey").
    *   *System*: Automatically attached to the *last open block*.
3.  **Block Close**: Waiter selects another **Main** `Product` (e.g., "Croissant").
    *   *System*: Closes the previous block and starts a new one.

**Ticket Example**:
1.  **Whole Wheat Toast** (Main)
    *   + Avocado (Addon)
    *   + Turkey (Addon)
    *   > No Salt (Note)
2.  **Croissant** (Main)
    *   > Heated (Note)

---

## 5. Schema Reference

### Updates (v3)
*   **DELETE**: `modifier_groups`, `product_modifier_groups`, `modifier_group_options`, `category_modifier_groups`.
*   **UPDATE**: `products` table simplified.

```typescript
// products schematic
{
  name: string,
  price: number,
  categoryId: Id<"categories">,
  elementType: "product" | "addon" | "note", // Strict control
  ingredients: {
    id: Id<"ingredients">,
    quantity: number
  }[], // Embedded Recipe
}
```
