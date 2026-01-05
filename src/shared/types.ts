export type TableStatus = "pending" | "waiting" | "code3" | "served";
export type SidebarMode = "mesa" | "cola";

import type { Doc, Id } from "@convex/_generated/dataModel";

export type Allergen = Doc<"allergens">;
export type Ingredient = Doc<"ingredients">;
export type Category = Doc<"categories">;
export type Product = Doc<"products">;
export type User = Doc<"users">;
export type Table = Doc<"tables">;
export type DailyMetric = Doc<"daily_metrics">;

export type { Id };
