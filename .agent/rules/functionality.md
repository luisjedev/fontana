# 🍽️ Table & Waitlist Management App

> **Objective**: Develop an agile and visual app to manage customer flow in a restaurant, controlling table occupancy and waitlist in real-time.

---

## 🎯 Project Scope

Designed for high-paced hospitality needing:
- To visualize table status (Free, Occupied, Reserved, Cleaning).
- To manage an efficient waitlist when the venue is full.
- To assign tables quickly and optimize rotation.

---

## 📋 Functional Modules

### 1. 🪑 Table Management (Floor)
#### Features
- [ ] Graphical visualization of table distribution (Map/Grid).
- [ ] Table Statuses:
    - 🟠 **Pendiente de atender**: Waiting for service.
    - 👤 **Esperando a alguien**: Waiting for other guests.
    - 💳 **Esperando cuenta para pagar**: Waiting for the bill.
- [ ] Quick customer-to-table assignment.
- [ ] Occupancy time counter.

### 2. 📝 Waitlist
#### Features
- [ ] Quick group registration (Name, Pax, Phone).
- [ ] Wait time estimation.
- [ ] SMS/WhatsApp Notification (Optional/Phase 2).
- [ ] Move from Waitlist -> Table.

### 3. 📊 Simple Metrics
- [ ] Average wait time.
- [ ] Table rotation.

---

## 🎨 UI/UX Design
- **Mobile First**: Designed to be used on tablets or mobiles by waiters/host staff.
- **Large Buttons**: For quick usability.
- **Color Coding**: Intensive use of colors for statuses (Traffic light system).

---

## 🗓️ Development Phases

### Phase 1: MVP
- [ ] Clean Setup (Done).
- [ ] Tables CRUD (Create/Edit zones and tables).
- [ ] Floor View (Table grid with statuses).
- [ ] Basic Waitlist (Add/Delete).

---
**Version**: 1.0


Functional Details:

SORTING:

Tables will be sorted by the following criteria:

Table Status:
1. Pending
2. Code 3
3. Waiting

Within each status, they will be sorted by wait time (older tables show first. This also applies to queues).

DATA INSERTION:

Tables: table number (unique), status, initial moment (timeStamp, for both creation and modification, to track time in current status).

Queue: Number of people, initial moment (timeStamp).
