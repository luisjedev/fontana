# 🔐 Authentication

**Implementation**: Convex Auth (`@convex-dev/auth`)

The application uses Convex's native authentication solution.

## Tables
- `users`: Stores user profile (name, email, image).
- `auth_sessions`: Management of active sessions.
- `auth_accounts`: Linked identity providers (OAuth, etc).

## Authorization Model
- **RBAC**: (To be implemented/confirmed). Currently, most mutations check for `ctx.auth.getUserIdentity()` to ensure the user is logged in.
