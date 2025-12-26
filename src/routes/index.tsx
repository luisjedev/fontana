import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: AppOverview,
})

function AppOverview() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Control Financiero - Cafetería
        </h1>
        <p className="text-slate-400 mb-8">
          Sistema de gestión financiera para pequeños negocios de hostelería
        </p>

        {/* Stack Tecnológico */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            🛠️ Stack Tecnológico
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Framework
                </h3>
                <p className="text-white">TanStack Start (React)</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Backend/DB
                </h3>
                <p className="text-white">Convex</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Router
                </h3>
                <p className="text-white">TanStack Router</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Data Fetching
                </h3>
                <p className="text-white">TanStack Query + Convex</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Estilos
                </h3>
                <p className="text-white">TailwindCSS</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Estado Global
                </h3>
                <p className="text-white">Zustand</p>
              </div>
            </div>
          </div>
        </section>

        {/* Módulos Planificados */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            📦 Módulos Planificados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModuleCard
              title="💰 Ingresos"
              description="Registro de ventas diarias, caja, métodos de pago"
              features={[
                'Registro por fecha y turno',
                'Múltiples métodos de pago',
                'Categorización de ingresos',
                'Historial y filtros',
              ]}
            />
            <ModuleCard
              title="📉 Gastos"
              description="Control de gastos operativos y recurrentes"
              features={[
                'Categorías de gastos',
                'Vinculación con proveedores',
                'Adjuntar comprobantes',
                'Gastos recurrentes',
              ]}
            />
            <ModuleCard
              title="🏢 Proveedores"
              description="Directorio y gestión de proveedores"
              features={[
                'Datos de contacto',
                'Condiciones de pago',
                'Historial de compras',
                'Activación/desactivación',
              ]}
            />
            <ModuleCard
              title="📝 Facturas"
              description="Control de facturas y pagos a proveedores"
              features={[
                'Estados: pendiente/pagada/vencida',
                'Alertas de vencimiento',
                'Registro de pagos',
                'Vinculación con proveedores',
              ]}
            />
            <ModuleCard
              title="📊 Dashboard"
              description="Panel principal con resumen financiero"
              features={[
                'Resumen del día',
                'Gráficos de flujo de caja',
                'Alertas activas',
                'Comparativas mensuales',
              ]}
            />
            <ModuleCard
              title="📈 Reportes"
              description="Informes y exportación de datos"
              features={[
                'Informe mensual',
                'Gastos por categoría',
                'Flujo de caja',
                'Exportación PDF/Excel',
              ]}
            />
          </div>
        </section>

        {/* Schema de Base de Datos */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            🗄️ Schema de Base de Datos (Convex)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SchemaCard
              table="ingresos"
              fields={[
                'fecha: number',
                'monto: number',
                'metodoPago: string',
                'categoria?: string',
                'turno?: string',
                'descripcion?: string',
              ]}
              indexes={['by_fecha']}
            />
            <SchemaCard
              table="gastos"
              fields={[
                'fecha: number',
                'monto: number',
                'categoria: string',
                'proveedorId?: Id<proveedores>',
                'descripcion: string',
                'recurrente: boolean',
                'frecuencia?: string',
              ]}
              indexes={['by_fecha', 'by_proveedor', 'by_categoria']}
            />
            <SchemaCard
              table="proveedores"
              fields={[
                'nombreComercial: string',
                'cif?: string',
                'telefono?: string',
                'email?: string',
                'condicionesPago: string',
                'activo: boolean',
              ]}
              indexes={['by_activo']}
            />
            <SchemaCard
              table="facturas"
              fields={[
                'proveedorId: Id<proveedores>',
                'numeroFactura: string',
                'fechaFactura: number',
                'fechaVencimiento: number',
                'monto: number',
                'iva: number',
                'total: number',
                'estado: string',
              ]}
              indexes={['by_proveedor', 'by_estado', 'by_fecha_vencimiento']}
            />
          </div>
        </section>

        {/* Estado del Proyecto */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            ✅ Estado Actual
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <ul className="space-y-2">
              <li className="flex items-center text-green-400">
                <span className="mr-2">✓</span> Proyecto TanStack Start
                inicializado
              </li>
              <li className="flex items-center text-green-400">
                <span className="mr-2">✓</span> Convex configurado y corriendo
              </li>
              <li className="flex items-center text-green-400">
                <span className="mr-2">✓</span> Schema de base de datos definido
              </li>
              <li className="flex items-center text-green-400">
                <span className="mr-2">✓</span> Funciones CRUD de Convex creadas
              </li>
              <li className="flex items-center text-green-400">
                <span className="mr-2">✓</span> Tipos TypeScript configurados
              </li>
              <li className="flex items-center text-slate-400">
                <span className="mr-2">○</span> Esperando diseño UI para
                implementar vistas
              </li>
            </ul>
          </div>
        </section>
      </div>
      <Outlet />
    </div>
  )
}

function ModuleCard({
  title,
  description,
  features,
}: {
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <ul className="space-y-1">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-slate-300">
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SchemaCard({
  table,
  fields,
  indexes,
}: {
  table: string
  fields: string[]
  indexes: string[]
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-cyan-400 mb-3 font-mono">
        {table}
      </h3>
      <div className="mb-4">
        <h4 className="text-xs font-medium text-slate-400 mb-2">CAMPOS</h4>
        <ul className="space-y-1">
          {fields.map((field, i) => (
            <li key={i} className="text-sm text-slate-300 font-mono">
              {field}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-medium text-slate-400 mb-2">ÍNDICES</h4>
        <ul className="space-y-1">
          {indexes.map((index, i) => (
            <li key={i} className="text-sm text-green-400 font-mono">
              {index}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


