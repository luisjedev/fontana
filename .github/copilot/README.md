# Copilot AI Hub

Single source of truth for AI operational context in VS Code + Copilot.

## Structure

- `context/`
  - `project-context.md`: Main operational context for the repository.
  - `project-reference.md`: Expanded technical reference (commands, architecture, patterns).
  - `business-scope.md`: Functional scope and domain behavior.
  - `workflow-rules.md`: Execution workflow and delivery protocol.
  - `context7-policy.md`: Third-party docs lookup policy.
  - `convex-schema-reference.md`: Convex schema and validator reference.
- `skills/`
  - `react-best-practices.md`: React performance and implementation skill guide.
- `workflows/`
  - `start-dev.md`: Start local development.
  - `format-biome.md`: Formatting/lint command.
  - `deploy-prod.md`: Production deployment flow.

## Migration Notes

- Legacy sources moved into this hub:
  - `.agent/rules/*` → `context/*`
  - `.agent/workflows/*` → `workflows/*`
  - `docs/skills/REACT_BEST_PRACTICES.md` → `skills/react-best-practices.md`
  - `CLAUDE.md` → `context/project-reference.md`
  - `.cursorrules` → `context/convex-schema-reference.md`

Use this folder as the canonical entry point for AI instructions and context.