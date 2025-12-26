import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Query: Obtener todos los gastos ordenados por fecha
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('gastos').order('desc').collect()
  },
})

// Query: Obtener gastos por rango de fechas
export const listByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('gastos')
      .withIndex('by_fecha', (q) =>
        q.gte('fecha', args.startDate).lte('fecha', args.endDate),
      )
      .order('desc')
      .collect()
  },
})

// Query: Obtener gastos por categoría
export const listByCategoria = query({
  args: { categoria: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('gastos')
      .withIndex('by_categoria', (q) => q.eq('categoria', args.categoria))
      .order('desc')
      .collect()
  },
})

// Query: Obtener gastos por proveedor
export const listByProveedor = query({
  args: { proveedorId: v.id('proveedores') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('gastos')
      .withIndex('by_proveedor', (q) => q.eq('proveedorId', args.proveedorId))
      .order('desc')
      .collect()
  },
})

// Query: Obtener un gasto por ID
export const get = query({
  args: { id: v.id('gastos') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Mutation: Crear un nuevo gasto
export const create = mutation({
  args: {
    fecha: v.number(),
    monto: v.number(),
    categoria: v.string(),
    descripcion: v.string(),
    proveedorId: v.optional(v.id('proveedores')),
    comprobante: v.optional(v.string()),
    recurrente: v.boolean(),
    frecuencia: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert('gastos', {
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Mutation: Actualizar un gasto
export const update = mutation({
  args: {
    id: v.id('gastos'),
    fecha: v.optional(v.number()),
    monto: v.optional(v.number()),
    categoria: v.optional(v.string()),
    descripcion: v.optional(v.string()),
    proveedorId: v.optional(v.id('proveedores')),
    comprobante: v.optional(v.string()),
    recurrente: v.optional(v.boolean()),
    frecuencia: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })
    return id
  },
})

// Mutation: Eliminar un gasto
export const remove = mutation({
  args: { id: v.id('gastos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Query: Obtener total de gastos por rango de fechas
export const getTotalByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const gastos = await ctx.db
      .query('gastos')
      .withIndex('by_fecha', (q) =>
        q.gte('fecha', args.startDate).lte('fecha', args.endDate),
      )
      .collect()

    return gastos.reduce((total, gasto) => total + gasto.monto, 0)
  },
})

// Query: Obtener total de gastos por categoría en un rango de fechas
export const getTotalByCategoria = query({
  args: {
    categoria: v.string(),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const gastos = await ctx.db
      .query('gastos')
      .withIndex('by_categoria', (q) => q.eq('categoria', args.categoria))
      .filter((q) =>
        q.and(
          q.gte(q.field('fecha'), args.startDate),
          q.lte(q.field('fecha'), args.endDate),
        ),
      )
      .collect()

    return gastos.reduce((total, gasto) => total + gasto.monto, 0)
  },
})
