import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'
import { useState } from 'react'

export const Route = createFileRoute('/ingresos/nuevo')({
  component: NuevoIngresoPage,
})

function NuevoIngresoPage() {
  const navigate = useNavigate()
  const createIngreso = useConvexMutation(api.ingresos.create)

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    monto: '',
    metodoPago: 'efectivo',
    categoria: 'ventas',
    turno: '',
    descripcion: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createIngreso({
        fecha: new Date(formData.fecha).getTime(),
        monto: Number.parseFloat(formData.monto),
        metodoPago: formData.metodoPago,
        categoria: formData.categoria || undefined,
        turno: formData.turno || undefined,
        descripcion: formData.descripcion || undefined,
      })

      navigate({ to: '/ingresos' })
    } catch (error) {
      console.error('Error al crear ingreso:', error)
      alert('Error al crear el ingreso')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate({ to: '/ingresos' })}
            className="text-slate-400 hover:text-white mb-4"
          >
            ← Volver a ingresos
          </button>
          <h1 className="text-3xl font-bold text-white">Nuevo Ingreso</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-lg p-6"
        >
          <div className="space-y-6">
            {/* Fecha */}
            <div>
              <label
                htmlFor="fecha"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Fecha *
              </label>
              <input
                type="date"
                id="fecha"
                required
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Monto */}
            <div>
              <label
                htmlFor="monto"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Monto (€) *
              </label>
              <input
                type="number"
                id="monto"
                required
                step="0.01"
                min="0"
                value={formData.monto}
                onChange={(e) =>
                  setFormData({ ...formData, monto: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                placeholder="0.00"
              />
            </div>

            {/* Método de pago */}
            <div>
              <label
                htmlFor="metodoPago"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Método de pago *
              </label>
              <select
                id="metodoPago"
                required
                value={formData.metodoPago}
                onChange={(e) =>
                  setFormData({ ...formData, metodoPago: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="bizum">Bizum</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label
                htmlFor="categoria"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Categoría
              </label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Sin categoría</option>
                <option value="ventas">Ventas</option>
                <option value="extraordinario">Extraordinario</option>
              </select>
            </div>

            {/* Turno */}
            <div>
              <label
                htmlFor="turno"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Turno
              </label>
              <select
                id="turno"
                value={formData.turno}
                onChange={(e) =>
                  setFormData({ ...formData, turno: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Sin turno</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                placeholder="Notas adicionales..."
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Guardar Ingreso
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: '/ingresos' })}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
