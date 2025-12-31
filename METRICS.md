# Definición de Métricas - Fontana

Este documento registra las métricas disponibles y planificadas para el sistema de análisis del restaurante.

## Métricas de Mesas (Table Management)

### Implementadas
*   (Ninguna actual visualizada, pero datos crudos existen parcialmente)

### Planificadas (Próxima Implementación)
1.  **Tiempo Medio de Atención (Service Time)**
    *   **Definición**: Tiempo transcurrido desde que se crea una mesa (se sienta el cliente/Pendiente) hasta que se elimina (mesa libre).
    *   **Cálculo**: `Timestamp Eliminación - Timestamp Creación`.
    *   **Utilidad**: Medir rotación de mesas y eficiencia general.

2.  **Tiempo Medio de Cobro (Payment Time)**
    *   **Definición**: Tiempo que una mesa pasa en estado `Código 3` (Pidiendo la cuenta) hasta que se libera.
    *   **Cálculo**: `Timestamp Eliminación - Timestamp Inicio Código 3`.
    *   **Utilidad**: Detectar cuellos de botella en el proceso de pago.

## Métricas de Lista de Espera (Waitlist)

### Implementadas
*   **Abandonos**: Registro de grupos que abandonan la cola.

### Planificadas
1.  **Tiempo de Cola Activa (Daily Queue Activity)**
    *   **Definición**: Cantidad total de tiempo en un día durante el cual hubo al menos 1 grupo esperando en la cola.
    *   **Cálculo**: Sumatorio de intervalos donde `waitlist.length > 0`.
    *   **Utilidad**: Identificar horas punta y saturación real del local.

2.  **Abandonos**: % de grupos en espera que acaban sentándose vs. abandonos.

## Futuras Ideas
*   *Ocupación por hora*: Nº de mesas ocupadas promedio por franja horaria.
*   *Tamaño medio de grupo*: Promedio de personas por mesa/cola.
