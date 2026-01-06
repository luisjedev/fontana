# 🧠 Core Concepts

Fontana is a specialized application for managing a high-efficiency coffee shop / restaurant environment.

## The "Flow"

The application focuses on optimizing the **Table Turnover Rate** and **Customer Queue Management**.

1.  **Waitlist**: Customers arrive and are added to a digital waitlist.
2.  **Seating**: Customers are assigned to tables (Table Numbers).
3.  **Status Cycle**: Tables go through defined states to track service speed.
    - `pending`: Just seated, waiting for order.
    - `waiting`: Order taken, waiting for food.
    - `code3`: Eating/Served.
    - `served` / `payment`: Finishing up, payment.
4.  **Analytics**: Every second spent in each status is tracked to generate efficiency reports.

## Mobile-First Design
The UI is designed to be used by waiters on mobile devices moving fast.
- **Keypad Mode**: For quickly selecting table numbers or entering quantities.
- **Gestures**: Swipe actions for status changes (if implemented).
