/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as allergens from "../allergens.js";
import type * as analytics from "../analytics.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as cron_analytics from "../cron_analytics.js";
import type * as crons from "../crons.js";
import type * as dev from "../dev.js";
import type * as http from "../http.js";
import type * as ingredients from "../ingredients.js";
import type * as maintenance from "../maintenance.js";
import type * as seedAllergens from "../seedAllergens.js";
import type * as tables from "../tables.js";
import type * as waitlist from "../waitlist.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  allergens: typeof allergens;
  analytics: typeof analytics;
  auth: typeof auth;
  categories: typeof categories;
  cron_analytics: typeof cron_analytics;
  crons: typeof crons;
  dev: typeof dev;
  http: typeof http;
  ingredients: typeof ingredients;
  maintenance: typeof maintenance;
  seedAllergens: typeof seedAllergens;
  tables: typeof tables;
  waitlist: typeof waitlist;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
