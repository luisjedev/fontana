# 📦 Admin: Product Catalog

**Location**: `src/features/admin` (and specific sub-features)

This module manages the menu and inventory definitions. It follows a hierarchical structure.

## Structure

### 1. Categories (`src/features/admin/categories`)
- Top-level grouping (e.g., "Coffee", "Pastries", "Sandwiches").
- **Attributes**:
    - `tax_percent`: Specific tax rate for this category.
    - `tag_color`: Visual distinction in the POS.

### 2. Ingredients (`src/features/admin/ingredients`)
- The atomic units of inventory.
- Can be linked to **Allergens**.
- **Usage**: Ingredients are composed into Products.

### 3. Products (`src/features/admin/products`)
- The actual sellable items.
- **Types** (`elementType`):
    - `product`: A standard item (e.g., "Latte").
    - `addon`: An extra (e.g., "Extra Shot").
    - `note`: Kitchen instruction.
- **Relationships**:
    - Belongs to one **Category**.
    - Contains multiple **Ingredients** (with quantities).

## Schema
See [[Data_Schema|Data Schema]] for the validation rules (Zod/Convex).
