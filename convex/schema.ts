import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Tabla de Ingresos
  ingresos: defineTable({
    fecha: v.number(), // timestamp
    monto: v.number(),
    metodoPago: v.string(), // 'efectivo' | 'tarjeta' | 'bizum' | 'transferencia'
    categoria: v.optional(v.string()), // 'ventas' | 'extraordinario'
    descripcion: v.optional(v.string()),
    turno: v.optional(v.string()), // 'mañana' | 'tarde' | 'noche'
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_fecha', ['fecha']),

  // Tabla de Gastos
  gastos: defineTable({
    fecha: v.number(),
    monto: v.number(),
    categoria: v.string(), // 'alquiler' | 'suministros' | 'nominas' | 'compras' | 'mantenimiento' | 'marketing' | 'impuestos' | 'bancarios' | 'otros'
    proveedorId: v.optional(v.id('proveedores')),
    descripcion: v.string(),
    comprobante: v.optional(v.string()), // URL del archivo
    recurrente: v.boolean(),
    frecuencia: v.optional(v.string()), // 'mensual' | 'trimestral' | 'anual'
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_fecha', ['fecha'])
    .index('by_proveedor', ['proveedorId'])
    .index('by_categoria', ['categoria']),

  // Tabla de Proveedores
  proveedores: defineTable({
    nombreComercial: v.string(),
    cif: v.optional(v.string()),
    telefono: v.optional(v.string()),
    email: v.optional(v.string()),
    direccion: v.optional(v.string()),
    personaContacto: v.optional(v.string()),
    condicionesPago: v.string(), // 'contado' | '30dias' | '60dias' | '90dias'
    notas: v.optional(v.string()),
    activo: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_activo', ['activo']),

  // Tabla de Facturas
  facturas: defineTable({
    proveedorId: v.id('proveedores'),
    numeroFactura: v.string(),
    fechaFactura: v.number(),
    fechaVencimiento: v.number(),
    monto: v.number(),
    iva: v.number(),
    total: v.number(),
    estado: v.string(), // 'pendiente' | 'pagada' | 'vencida'
    fechaPago: v.optional(v.number()),
    metodoPago: v.optional(v.string()),
    comprobante: v.optional(v.string()),
    notas: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_proveedor', ['proveedorId'])
    .index('by_estado', ['estado'])
    .index('by_fecha_vencimiento', ['fechaVencimiento']),
})
