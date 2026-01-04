# Changelog: Products Feature

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
