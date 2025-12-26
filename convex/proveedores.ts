import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Query: Obtener todos los proveedores
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('proveedores').order('desc').collect()
  },
})

// Query: Obtener proveedores activos
export const listActivos = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('proveedores')
      .withIndex('by_activo', (q) => q.eq('activo', true))
      .order('desc')
      .collect()
  },
})

// Query: Obtener un proveedor por ID
export const get = query({
  args: { id: v.id('proveedores') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Mutation: Crear un nuevo proveedor
export const create = mutation({
  args: {
    nombreComercial: v.string(),
    cif: v.optional(v.string()),
    telefono: v.optional(v.string()),
    email: v.optional(v.string()),
    direccion: v.optional(v.string()),
    personaContacto: v.optional(v.string()),
    condicionesPago: v.string(),
    notas: v.optional(v.string()),
    activo: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert('proveedores', {
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Mutation: Actualizar un proveedor
export const update = mutation({
  args: {
    id: v.id('proveedores'),
    nombreComercial: v.optional(v.string()),
    cif: v.optional(v.string()),
    telefono: v.optional(v.string()),
    email: v.optional(v.string()),
    direccion: v.optional(v.string()),
    personaContacto: v.optional(v.string()),
    condicionesPago: v.optional(v.string()),
    notas: v.optional(v.string()),
    activo: v.optional(v.boolean()),
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

// Mutation: Eliminar un proveedor
export const remove = mutation({
  args: { id: v.id('proveedores') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Mutation: Desactivar un proveedor (soft delete)
export const desactivar = mutation({
  args: { id: v.id('proveedores') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      activo: false,
      updatedAt: Date.now(),
    })
    return args.id
  },
})

// Mutation: Activar un proveedor
export const activar = mutation({
  args: { id: v.id('proveedores') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      activo: true,
      updatedAt: Date.now(),
    })
    return args.id
  },
})
