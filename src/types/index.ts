import type { Doc, Id } from '../convex/_generated/dataModel'

// Tipos base de las tablas
export type Ingreso = Doc<'ingresos'>
export type Gasto = Doc<'gastos'>
export type Proveedor = Doc<'proveedores'>
export type Factura = Doc<'facturas'>

// Tipos de IDs
export type IngresoId = Id<'ingresos'>
export type GastoId = Id<'gastos'>
export type ProveedorId = Id<'proveedores'>
export type FacturaId = Id<'facturas'>

// Enums y tipos literales
export type MetodoPago = 'efectivo' | 'tarjeta' | 'bizum' | 'transferencia'
export type CategoriaIngreso = 'ventas' | 'extraordinario'
export type Turno = 'mañana' | 'tarde' | 'noche'

export type CategoriaGasto =
  | 'alquiler'
  | 'suministros'
  | 'nominas'
  | 'compras'
  | 'mantenimiento'
  | 'marketing'
  | 'impuestos'
  | 'bancarios'
  | 'otros'

export type FrecuenciaGasto = 'mensual' | 'trimestral' | 'anual'

export type CondicionesPago = 'contado' | '30dias' | '60dias' | '90dias'

export type EstadoFactura = 'pendiente' | 'pagada' | 'vencida'

// Tipos para formularios (sin campos auto-generados)
export type IngresoFormData = Omit<Ingreso, '_id' | '_creationTime' | 'createdAt' | 'updatedAt'>
export type GastoFormData = Omit<Gasto, '_id' | '_creationTime' | 'createdAt' | 'updatedAt'>
export type ProveedorFormData = Omit<
  Proveedor,
  '_id' | '_creationTime' | 'createdAt' | 'updatedAt'
>
export type FacturaFormData = Omit<Factura, '_id' | '_creationTime' | 'createdAt' | 'updatedAt'>

// Tipos para resúmenes y estadísticas
export interface ResumenFinanciero {
  ingresos: number
  gastos: number
  balance: number
  periodo: {
    inicio: number
    fin: number
  }
}

export interface ResumenDiario extends ResumenFinanciero {
  fecha: number
}

export interface GastoPorCategoria {
  categoria: CategoriaGasto
  total: number
  porcentaje: number
}

export interface AlertaFactura {
  factura: Factura
  proveedor: Proveedor
  diasRestantes: number
  tipo: 'vencida' | 'proxima'
}
