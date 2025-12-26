import { createFileRoute } from '@tanstack/react-router'
import { useConvexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/ingresos/')({
  component: IngresosPage,
})

function IngresosPage() {
  const ingresos = useConvexQuery(api.ingresos.list, {})

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Ingresos</h1>
          <a
            href="/ingresos/nuevo"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            + Nuevo Ingreso
          </a>
        </div>

        {/* Lista de ingresos */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Turno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {ingresos?.map((ingreso) => (
                <tr key={ingreso._id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {new Date(ingreso.fecha).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">
                    €{ingreso.monto.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {ingreso.metodoPago}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {ingreso.categoria || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {ingreso.turno || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {ingreso.descripcion || '-'}
                  </td>
                </tr>
              ))}
              {(!ingresos || ingresos.length === 0) && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    No hay ingresos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
