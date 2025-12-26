import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Query: Obtener todas las facturas
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('facturas').order('desc').collect()
  },
})

// Query: Obtener facturas por proveedor
export const listByProveedor = query({
  args: { proveedorId: v.id('proveedores') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('facturas')
      .withIndex('by_proveedor', (q) => q.eq('proveedorId', args.proveedorId))
      .order('desc')
      .collect()
  },
})

// Query: Obtener facturas por estado
export const listByEstado = query({
  args: { estado: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('facturas')
      .withIndex('by_estado', (q) => q.eq('estado', args.estado))
      .order('desc')
      .collect()
  },
})

// Query: Obtener facturas próximas a vencer (próximos 7 días)
export const listProximasVencer = query({
  handler: async (ctx) => {
    const now = Date.now()
    const sevenDaysFromNow = now + 7 * 24 * 60 * 60 * 1000

    return await ctx.db
      .query('facturas')
      .withIndex('by_fecha_vencimiento', (q) =>
        q.gte('fechaVencimiento', now).lte('fechaVencimiento', sevenDaysFromNow),
      )
      .filter((q) => q.eq(q.field('estado'), 'pendiente'))
      .collect()
  },
})

// Query: Obtener facturas vencidas
export const listVencidas = query({
  handler: async (ctx) => {
    const now = Date.now()

    return await ctx.db
      .query('facturas')
      .withIndex('by_fecha_vencimiento', (q) => q.lt('fechaVencimiento', now))
      .filter((q) => q.eq(q.field('estado'), 'pendiente'))
      .collect()
  },
})

// Query: Obtener una factura por ID
export const get = query({
  args: { id: v.id('facturas') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Mutation: Crear una nueva factura
export const create = mutation({
  args: {
    proveedorId: v.id('proveedores'),
    numeroFactura: v.string(),
    fechaFactura: v.number(),
    fechaVencimiento: v.number(),
    monto: v.number(),
    iva: v.number(),
    total: v.number(),
    estado: v.string(),
    notas: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert('facturas', {
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// Mutation: Actualizar una factura
export const update = mutation({
  args: {
    id: v.id('facturas'),
    proveedorId: v.optional(v.id('proveedores')),
    numeroFactura: v.optional(v.string()),
    fechaFactura: v.optional(v.number()),
    fechaVencimiento: v.optional(v.number()),
    monto: v.optional(v.number()),
    iva: v.optional(v.number()),
    total: v.optional(v.number()),
    estado: v.optional(v.string()),
    fechaPago: v.optional(v.number()),
    metodoPago: v.optional(v.string()),
    comprobante: v.optional(v.string()),
    notas: v.optional(v.string()),
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

// Mutation: Marcar factura como pagada
export const marcarPagada = mutation({
  args: {
    id: v.id('facturas'),
    fechaPago: v.number(),
    metodoPago: v.string(),
    comprobante: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...paymentData } = args
    await ctx.db.patch(id, {
      ...paymentData,
      estado: 'pagada',
      updatedAt: Date.now(),
    })
    return id
  },
})

// Mutation: Eliminar una factura
export const remove = mutation({
  args: { id: v.id('facturas') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Query: Obtener total de facturas pendientes
export const getTotalPendientes = query({
  handler: async (ctx) => {
    const facturas = await ctx.db
      .query('facturas')
      .withIndex('by_estado', (q) => q.eq('estado', 'pendiente'))
      .collect()

    return facturas.reduce((total, factura) => total + factura.total, 0)
  },
})
