# Components Architecture Guideline

Every UI component in **Furnixo** must strictly adhere to these standards.

---

## Component Directory Standards

- **Simple Components**: Implemented as single files (e.g., `src/components/ui/button.tsx`) with adjacent test files (e.g., `src/components/ui/button.test.tsx`).
- **Complex Components**: Placed in folders (e.g., `src/components/ui/modal/`) containing:
  - `index.ts` (Barrel export)
  - `modal.tsx` (Component logic)
  - `modal.test.tsx` (Adjacent tests)
  - `modal.types.ts` (Specific typings)
  - `modal.styles.ts` (Styling variants)

---

## Naming Conventions

- **Files & Directories**: `kebab-case` (e.g., `theme-provider.tsx`, `use-local-storage.ts`)
- **Hooks**: `camelCase` (e.g., `useLocalStorage`, `useFocusTrap`)
- **Components**: `PascalCase` (e.g., `Button`, `CardHeader`)
- **Types & Interfaces**: `PascalCase` (e.g., `ButtonProps`)
- **Constants**: `UPPER_CASE` (e.g., `MOTION_PRESETS`)

---

## Component Creation Rules

- UI components must remain **pure**, **generic**, and **fully reusable**.
- Never import business or feature modules.
- Extend `BaseComponentProps` from `src/types/component.ts` (`className`, `children`, `id`, `data-testid`).
- Map visual states (disabled, loading, validation success/warning/error).
- Expose forward references (`React.forwardRef`) where applicable.

---

## Accessibility Standards (WCAG 2.2 AA)

- **Focus Outlines**: Enforce visible focus rings using `focus-visible:ring-2`.
- **Keyboard Navigation**: Standard keyboard controls (Space, Enter, Esc, Arrow Keys).
- **Screen Reader Support**: ARIA roles, `aria-expanded`, `aria-checked`.
- **Semantic HTML**: Choose appropriate elements (`<nav>`, `<button>`, `<main>`).
- **Reduced Motion Support**: Disables transitions if `prefers-reduced-motion` is configured.
