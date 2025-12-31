# 🍽️ Fontana (Cafetería Finanzas)

> **App de Gestión de Mesas y Lista de Espera** para entornos de hostelería de alto ritmo.

**Fontana** es una aplicación web ágil y visual diseñada para gestionar el flujo de clientes en tiempo real. Permite al personal monitorizar la ocupación de las mesas, gestionar listas de espera de manera eficiente y controlar los abandonos para optimizar el servicio.

---

## 🎯 Funcionalidades Clave

### 1. 🪑 Gestión de Sala (Floor)
- **Grid Visual**: Vista gráfica en tiempo real de la distribución de las mesas.
- **Estados**:
  - 🟠 **PENDIENTE**: Pendiente de atender.
  - 👤 **ESPERANDO**: Esperando a otros comensales.
  - 💳 **CUENTA**: Esperando la cuenta.
- **Acciones Rápidas**: Cambios de estado y asignación con un solo toque.

### 2. 📝 Sistema de Lista de Espera
- **Registro Rápido**: Entrada veloz para grupos sin reserva (Nombre, Pax).
- **Gestión de Abandonos**: Registro de clientes que abandonan la cola sin llegar a sentarse, para metricas de pérdida de oportunidad.

### 3. 📊 Dashboard y Métricas
- **Vista General**: Instantánea en tiempo real de la capacidad actual del restaurante.
- **Diseño Mobile First**: Optimizado para tablets y móviles usados por el personal de sala.

---

## 🏗️ Stack Tecnológico ("Ultracite")

Construido con un stack moderno de alto rendimiento:

- **Frontend Core**: [React 19](https://react.dev/), [Vite 7](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Fullstack Framework**: [@tanstack/react-start](https://tanstack.com/start) (Listo para SSR/Hybrid)
- **Routing**: [@tanstack/react-router](https://tanstack.com/router) (Routing basado en archivos)
- **Datos y Estado**:
  - **DB & Backend**: [Convex](https://www.convex.dev/) (Base de datos Real-time)
  - **Estado**: [@tanstack/react-query](https://tanstack.com/query) + [Zustand](https://zustand-demo.pmnd.rs/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), iconos `lucide-react`.

---

## 🚀 Empezando

### Prerrequisitos
- Node.js y pnpm instalados.

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Configurar Convex (Backend)
Configura tu proyecto Convex y las variables de entorno:
```bash
npx convex dev
```
*Este comando inicia el servidor de desarrollo local de Convex y sincroniza las funciones.*

### 3. Iniciar la App
Arranca el servidor de desarrollo de Vite:
```bash
pnpm dev
# La app correrá en http://localhost:3000
```

---

## 🛠️ Scripts

- `pnpm dev`: Inicia el servidor de desarrollo frontend.
- `npx convex dev`: Inicia la sincronización del backend (Convex).
- `npx convex deploy`: Despliega el backend a producción.
- `pnpm check`: Ejecuta el linting y chequeo de tipos con Biome.
- `pnpm build`: Construye la aplicación para producción.

---

## 🏰 Arquitectura

El proyecto sigue una **Screaming Architecture** organizada por **Features**:

`src/features/` contiene la lógica específica del dominio (ej. `dashboard`, `tables`), mientras que `src/shared/` contiene componentes reutilizables y utilidades.

Para detalles completos de arquitectura, ver `.agent/rules/global-context.md`.
