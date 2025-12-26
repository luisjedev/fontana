# 📊 App de Control Financiero - Cafetería

> **Objetivo**: Desarrollar una aplicación web moderna para gestionar de forma simple y eficaz las finanzas de una cafetería, incluyendo gastos, ingresos, pagos a proveedores y reportes financieros.

---

## 🎯 Alcance del Proyecto

Esta aplicación está diseñada para pequeños negocios de hostelería (cafeterías, bares, restaurantes pequeños) que necesitan:

- Llevar un registro ordenado de sus movimientos financieros
- Controlar pagos a proveedores
- Tener visibilidad del estado financiero del negocio
- Generar reportes simples pero útiles

---

## 🏗️ Arquitectura Propuesta

### Stack Tecnológico

| Capa              | Tecnología                               |
| ----------------- | ---------------------------------------- |
| **Frontend**      | React + TanStack Router + TanStack Query |
| **Estilos**       | TailwindCSS                              |
| **Backend/DB**    | Convex (Backend as a Service)            |
| **Estado Global** | Zustand                                  |
| **Autenticación** | Convex Auth o Clerk                      |

### Justificación

- **Convex**: Permite desarrollo rápido con base de datos en tiempo real, sin necesidad de gestionar servidor
- **TanStack**: Stack moderno y eficiente para SPAs
- **TailwindCSS**: Desarrollo UI rápido y consistente

---

## 📋 Módulos Funcionales

### 1. 💰 Módulo de Ingresos

#### Funcionalidades

- [ ] Registro de ventas diarias (caja)
- [ ] Categorización de ingresos (efectivo, tarjeta, bizum, transferencia)
- [ ] Registro de ingresos extraordinarios
- [ ] Historial de ingresos con filtros por fecha

#### Campos principales

```
- ID (auto)
- Fecha
- Monto
- Método de pago
- Categoría
- Descripción/Notas
- Turno (mañana/tarde/noche) - opcional
```

---

### 2. 📉 Módulo de Gastos

#### Funcionalidades

- [ ] Registro de gastos operativos
- [ ] Categorización de gastos (suministros, alquiler, nóminas, marketing, etc.)
- [ ] Gastos recurrentes vs. puntuales
- [ ] Adjuntar comprobantes/facturas (imagen o PDF)
- [ ] Alertas de gastos inusuales

#### Categorías sugeridas

- 🏠 Alquiler/Hipoteca
- 💡 Suministros (luz, agua, gas)
- 👥 Nóminas y personal
- 🛒 Compras de mercancía
- 🔧 Mantenimiento y reparaciones
- 📢 Marketing y publicidad
- 📋 Impuestos y tasas
- 🏦 Gastos bancarios
- 📦 Otros

#### Campos principales

```
- ID (auto)
- Fecha
- Monto
- Categoría
- Proveedor (opcional, enlace a módulo proveedores)
- Descripción
- Comprobante (URL archivo)
- Recurrente (boolean)
- Frecuencia (si es recurrente)
```

---

### 3. 🏢 Módulo de Proveedores

#### Funcionalidades

- [ ] Directorio de proveedores
- [ ] Historial de compras por proveedor
- [ ] Control de pagos pendientes
- [ ] Datos de contacto y condiciones de pago
- [ ] Alertas de pagos próximos

#### Campos principales

```
- ID (auto)
- Nombre comercial
- CIF/NIF
- Teléfono
- Email
- Dirección
- Persona de contacto
- Condiciones de pago (contado, 30 días, 60 días)
- Notas
- Estado (activo/inactivo)
```

---

### 4. 📝 Módulo de Facturas/Pagos a Proveedores

#### Funcionalidades

- [ ] Registro de facturas recibidas
- [ ] Estado de facturas (pendiente, pagada, vencida)
- [ ] Calendario de vencimientos
- [ ] Registro de pagos realizados
- [ ] Alertas de facturas próximas a vencer
- [ ] Conciliación de pagos

#### Campos principales

```
- ID (auto)
- Proveedor (referencia)
- Número de factura
- Fecha factura
- Fecha vencimiento
- Monto
- IVA
- Total
- Estado (pendiente/pagada/vencida)
- Fecha de pago (si aplica)
- Método de pago
- Comprobante
```

---

### 5. 📊 Dashboard / Panel Principal

#### Widgets propuestos

- [ ] **Resumen del día**

  - Ingresos del día
  - Gastos del día
  - Balance del día

- [ ] **Gráfico de flujo de caja** (últimos 7/30 días)

- [ ] **Alertas activas**

  - Facturas próximas a vencer
  - Gastos recurrentes pendientes

- [ ] **Comparativa mensual**

  - Ingresos vs. mes anterior
  - Gastos vs. mes anterior
  - Beneficio neto

- [ ] **Top 5 categorías de gastos** (mes actual)

- [ ] **Accesos rápidos**
  - Nuevo ingreso
  - Nuevo gasto
  - Nueva factura

---

### 6. 📈 Módulo de Reportes

#### Reportes disponibles

- [ ] **Informe mensual**

  - Resumen de ingresos y gastos
  - Gráficos comparativos
  - Desglose por categorías

- [ ] **Informe de proveedores**

  - Gasto por proveedor
  - Historial de pagos

- [ ] **Informe de flujo de caja**

  - Proyección de pagos
  - Saldo proyectado

- [ ] **Exportación**
  - PDF
  - Excel/CSV

---

### 7. ⚙️ Configuración

#### Funcionalidades

- [ ] Datos del negocio (nombre, dirección, CIF)
- [ ] Gestión de usuarios (si multi-usuario)
- [ ] Categorías personalizables
- [ ] Métodos de pago
- [ ] Alertas y notificaciones
- [ ] Backup/Exportación de datos

---

## 🎨 Diseño UI/UX

### Principios de diseño

- **Simplicidad**: Interfaz limpia, sin elementos innecesarios
- **Modo oscuro**: Por defecto, con opción de modo claro
- **Responsive**: Funcional en móvil para registros rápidos
- **Accesos rápidos**: Las acciones más comunes (nuevo ingreso, nuevo gasto) deben ser accesibles en 1-2 clicks

### Paleta de colores sugerida

```css
/* Tema oscuro */
--bg-primary: #0f172a; /* Fondo principal */
--bg-secondary: #1e293b; /* Tarjetas */
--accent-green: #10b981; /* Ingresos, positivo */
--accent-red: #ef4444; /* Gastos, negativo */
--accent-blue: #3b82f6; /* Acciones, links */
--accent-amber: #f59e0b; /* Alertas, pendientes */
--text-primary: #f8fafc; /* Texto principal */
--text-secondary: #94a3b8; /* Texto secundario */
```

---

## 🗓️ Fases de Desarrollo

### Fase 1: MVP (Mínimo Producto Viable)

**Duración estimada: 2-3 semanas**

- [ ] Setup del proyecto (TanStack Start + Convex + TailwindCSS)
- [ ] Autenticación básica
- [ ] Módulo de ingresos (CRUD completo)
- [ ] Módulo de gastos (CRUD completo)
- [ ] Dashboard básico con resumen

### Fase 2: Proveedores y Facturas

**Duración estimada: 2 semanas**

- [ ] Módulo de proveedores
- [ ] Módulo de facturas/pagos
- [ ] Alertas de vencimientos
- [ ] Mejoras en dashboard

### Fase 3: Reportes y Optimización

**Duración estimada: 1-2 semanas**

- [ ] Módulo de reportes
- [ ] Exportación PDF/Excel
- [ ] Optimizaciones de rendimiento
- [ ] Testing y corrección de bugs

### Fase 4: Extras (Opcional)

- [ ] Gráficos avanzados
- [ ] Notificaciones push
- [ ] Integración con bancos (Open Banking)
- [ ] App móvil nativa

---

## 📐 Estructura de Carpetas Propuesta

```
src/
├── components/
│   ├── ui/              # Componentes reutilizables (Button, Card, Modal, etc.)
│   ├── layout/          # Header, Sidebar, Footer
│   ├── forms/           # Formularios específicos
│   └── charts/          # Componentes de gráficos
├── routes/
│   ├── __root.tsx
│   ├── index.tsx        # Dashboard
│   ├── ingresos/
│   ├── gastos/
│   ├── proveedores/
│   ├── facturas/
│   ├── reportes/
│   └── configuracion/
├── convex/
│   ├── schema.ts        # Definición de tablas
│   ├── ingresos.ts      # Funciones de ingresos
│   ├── gastos.ts
│   ├── proveedores.ts
│   └── facturas.ts
├── stores/              # Zustand stores
├── hooks/               # Custom hooks
├── lib/                 # Utilidades
└── types/               # TypeScript types
```

---

## ✅ Criterios de Aceptación

### Rendimiento

- Carga inicial < 3 segundos
- Navegación entre vistas < 500ms
- Actualizaciones en tiempo real

### Usabilidad

- Formularios con validación clara
- Mensajes de error/éxito visibles
- Atajos de teclado para acciones frecuentes

### Datos

- Backup automático (Convex lo gestiona)
- Exportación de datos disponible
- Historial de cambios (opcional)

---

## 🚀 Próximos Pasos

1. **Revisar y aprobar** este documento de planificación
2. **Definir prioridades** si hay funcionalidades que quieras añadir o quitar
3. **Comenzar con Fase 1** - Setup del proyecto

---

> **Nota**: Este documento es una guía inicial y puede ser modificado según las necesidades específicas del negocio. Se recomienda revisar y adaptar antes de comenzar el desarrollo.

**Fecha de creación**: 26 de Diciembre, 2024
**Versión**: 1.0
