# Logic: Products Feature (v3 - Flat Clean)

> [!CAUTION]
> **Simplificación Radical**: Se eliminan reglas, grupos de modificadores y restricciones.
> Se adopta un modelo de "Ticket Plano" donde todo es un `Product` con un `type`.

## 1. Nuevo Modelo de Datos

### Entidades

#### 1. Categorías
*   Organización visual (ej: Cafés, Extras, Notas de Cocina).
*   `tax_percent`, `image` (Opcional), `tag_color` (Opcional).

#### 2. Productos (Unificado)
Ahora todo ítem vendible o anotable vive aquí.
*   **Campos**: `name`, `price`, `categoryId`, `image` (Opcional).
*   **Receta (Embedded)**: `ingredients` -> Array `{ id, quantity }`.
    *   Optimizado para lecturas y cálculo de consumo post-venta.
    *   Elimina la necesidad de tablas auxiliares.

*   **Nuevo Campo `type`**:
    *   `product`: Ítem principal (Café, Tostada).
    *   `addon`: Ítem sumable (Extra Aguacate, Leche Soja). *Antiguos modificadores*.
    *   `note`: Instrucción (Sin Cebolla, Leche Templada). *Precio 0*.

#### 3. Recetas/Base
#### 3.1 Alérgenos
*   Lista simple de alérgenos (ej: Gluten, Lácteos).

#### 3.2 Ingredientes (Base/Stock)
*   Se mantiene para definición de costes, alérgenos y métricas de consumo.
*   **Campos**: `name`, `allergens` (Array IDs).
*   Se vinculan directamente en el array `ingredients` del producto.

---

## 2. Flujo de Operativa (Agrupación Secuencial)

El sistema de pedidos funciona por **Asociación Implícita basada en Orden de Entrada**:

1.  **Trigger**: El camarero selecciona un `Product` principal (ej: "Pan Integral").
    *   *Sistema*: Abre un nuevo "bloque" de ítem.
2.  **Addons**: Selecciona ingredientes/extras (ej: "Aguacate", "Pavo").
    *   *Sistema*: Se añaden automáticamente al último bloque abierto.
3.  **Cierre de Bloque**: El camarero selecciona otro `Product` principal (ej: "Croissant").
    *   *Sistema*: Cierra el bloque anterior y abre uno nuevo.

**Ejemplo de Ticket**:
1.  Pan Integral (Main)
    *   + Aguacate (Addon)
    *   + Pavo (Addon)
    *   > Sin Sal (Note)
2.  Croissant (Main)
    *   > Caliente (Note)

Esta lógica reside en el **Cliente (Frontend)**, el Schema solo provee los tipos para distinguirlos.

### Schema Changes
*   **DELETE**: `modifier_groups`, `product_modifier_groups`, `modifier_group_options`, `category_modifier_groups`.
*   **UPDATE**: `products` add `elementType` (renamed from 'type' to avoid keyword conflict if needed, or just type).

```typescript
// products
{
  name: string,
  price: number,
  categoryId: Id<"categories">,
  elementType: "product" | "addon" | "note", // Nuevo control
}
```
