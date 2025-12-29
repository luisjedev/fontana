# 🍽️ App de Gestión de Mesas y Lista de Espera

> **Objetivo**: Desarrollar una aplicación ágil y visual para gestionar el flujo de clientes en un restaurante, controlando la ocupación de mesas y la lista de espera en tiempo real.

---

## 🎯 Alcance del Proyecto

Diseñada para hostelería de alto ritmo que necesita:
- Visualizar el estado de las mesas (Libre, Ocupada, Reservada, Limpieza).
- Gestionar una lista de espera eficiente cuando el local está lleno.
- Asignar mesas rápidamente y optimizar la rotación.

---

## 📋 Módulos Funcionales

### 1. 🪑 Gestión de Mesas (Sala)
#### Funcionalidades
- [ ] Visualización gráfica de la distribución de mesas (Plano/Grid).
- [ ] Estados de mesa:
    - 🟢 **Libre**: Lista para nuevos clientes.
    - 🔴 **Ocupada**: Clientes comiendo.
    - 🟡 **Reservada**: Próxima a ocuparse.
    - 🔵 **Limpieza**: Clientes salieron, mesa sucia.
- [ ] Asignación rápida de clientes a mesas.
- [ ] Contador de tiempo de ocupación.

### 2. 📝 Lista de Espera
#### Funcionalidades
- [ ] Registro rápido de grupos (Nombre, Pax, Teléfono).
- [ ] Estimación de tiempo de espera.
- [ ] Notificación SMS/WhatsApp (Opcional/Fase 2).
- [ ] Mover de Lista de Espera -> Mesa.

### 3. 📊 Métricas Simples
- [ ] Tiempo promedio de espera.
- [ ] Rotación de mesas.

---

## 🎨 Diseño UI/UX
- **Mobile First**: Pensada para usarse en tablets o móviles por los camareros/hostess.
- **Botones Grandes**: Para facilitar el uso rápido.
- **Color Coding**: Uso intensivo de colores para estados (Semáforo).

---

## 🗓️ Fases de Desarrollo

### Fase 1: MVP
- [ ] Setup limpio (Hecho).
- [ ] CRUD de Mesas (Crear/Editar zonas y mesas).
- [ ] Vista de Sala (Grid de mesas con estados).
- [ ] Lista de Espera básica (Añadir/Borrar).

---
**Versión**: 1.0


Funcionalidades:

ORDENAMIENTO:

Las mesas se ordenarán por los siguientes criterios:

Estado de la mesa: 
1. Pendiente
2. Código 3
3. Esperando

Dentro de cada estado, se ordenarán por el tiempo de espera (las mesas más antiguas se mostrarán primero. Esto aplica también para las colas).

INSERCIÓN DE DATOS:

Mesas: número de mesa (único), estado, momento inicial(timeStamp, tanto en creación como en modificación, para saber cuanto tiempo lleva en su estado actual)

Cola: Número de personas, momento inicial(timeStamp).



