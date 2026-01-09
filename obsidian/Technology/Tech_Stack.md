# 🏗 Tech Stack

The `Fontana` project is built on a modern, high-performance stack designed for speed, scalability, and developer experience.

## Core Framework
- **React 19 (RC)**: Utilizing the latest React features including the React Compiler for automatic memoization.
- **Vite 7**: Next-generation frontend tooling for ultra-fast builds and HMR.
- **TypeScript 5.7+**: Strict type safety.

## TanStack Ecosystem
The application relies heavily on the TanStack libraries for robust full-stack capabilities:
- **@tanstack/react-start**: Full-stack framework with SSR and streaming support.
- **@tanstack/react-router**: Type-safe file-based routing located in `src/routes`.
- **@tanstack/react-query**: Async state management and data fetching.
- **@tanstack/react-form**: Type-safe and headless form management.

## State & Backend
- **Convex**: Backend-as-a-Service (BaaS) providing a real-time database, server functions, and rigorous type safety end-to-end.
- **Zustand**: Lightweight global client state management (used sparingly).

## Styling & and UI
- **Tailwind CSS 4**: The latest engine of Tailwind, using specific CSS variables for theming.
- **Shadcn UI**: Reusable component primitives located in `src/shared/components/ui`.
- **Lucide React**: Icon library.
- **Tw-animate-css**: Animation utilities.

## Tooling
- **Biome**: Fast rust-based linter and formatter. Replaces ESLint and Prettier.
    - Command: `pnpm check` (runs `biome check --write src`)

## Key Commands
```bash
pnpm dev           # Start frontend + convex dev server
pnpm build         # Production build
npx convex deploy  # Deploy backend to production
```
