import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Query: Obtener todos los ingresos ordenados por fecha
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('ingresos').order('desc').collect()
  },
})

// Query: Obtener ingresos por rango de fechas
export const listByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('ingresos')
      .withIndex('by_fecha', (q) =>
        q.gte('fecha', args.startDate).lte('fecha', args.endDate),
      )
      .order('desc')
      .collect()
  },
})

// Query: Obtener un ingreso por ID
export const get = query({
  args: { id: v.id('ingresos') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Mutation: Crear un nuevo ingreso
export const create = mutation({
  args: {
    fecha: v.number(),
    monto: v.number(),
    metodoPago: v.string(),
    categoria: v.optional(v.string()),
    descripcion: v.optional(v.string()),
    turno: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert('ingresos', {
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Mutation: Actualizar un ingreso
export const update = mutation({
  args: {
    id: v.id('ingresos'),
    fecha: v.optional(v.number()),
    monto: v.optional(v.number()),
    metodoPago: v.optional(v.string()),
    categoria: v.optional(v.string()),
    descripcion: v.optional(v.string()),
    turno: v.optional(v.string()),
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

// Mutation: Eliminar un ingreso
export const remove = mutation({
  args: { id: v.id('ingresos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Query: Obtener total de ingresos por rango de fechas
export const getTotalByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const ingresos = await ctx.db
      .query('ingresos')
      .withIndex('by_fecha', (q) =>
        q.gte('fecha', args.startDate).lte('fecha', args.endDate),
      )
      .collect()

    return ingresos.reduce((total, ingreso) => total + ingreso.monto, 0)
  },
})
