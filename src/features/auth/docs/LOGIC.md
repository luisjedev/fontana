# Authentication Logic

## Overview
Fontana uses **Convex Auth** for identity management. We prioritize a secure, controlled access environment (Staff/Admins only).

## Implementation Details

### Provider
*   **Type**: `Password` provider (Manual).
*   **Configuration**:
    *   Social logins (Google, GitHub) are **DISABLED**.
    *   Self-registration is **DISABLED**.
    *   Users are created via Admin mutations only.

### User Schema
*   `email`: **Primary identifier** for login.
*   `username`: Display/Handle (secondary).
*   `password`: Hashed.
*   `name`: Display name.
*   `role`: (Planned) `admin` | `staff`.

### Auth Flow
1.  **Login Screen**: User enters `email` + `password`.
2.  **Verification**: Convex Auth validates credentials.
3.  **Session**: JWT/Session token issued.
4.  **Route Guard**: `__root.tsx` checks authentication state. If unauthenticated, redirects to `/login`.
