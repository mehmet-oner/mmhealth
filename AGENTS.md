# Repository Guidelines

## Project Structure & Module Organization
The App Router lives under `app/`, with `layout.tsx` wiring fonts and `page.tsx` serving the landing view. Global styles and Tailwind layer definitions are centralized in `app/globals.css`. Shared configuration stays at the repo root (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`). Static assets and icons belong in `public/`; import them via absolute paths (`/next.svg`). Leverage the `@/**/*` path alias from `tsconfig.json` for cross-module imports.

## Build, Test, and Development Commands
- `npm run dev`: Start the local Next.js dev server with Turbopack hot reload.
- `npm run build`: Produce an optimized production bundle.
- `npm run start`: Serve the build output locally for verification.
- `npm run lint`: Run ESLint with the Next.js + TypeScript presets.
Run commands from the repository root and stick to `npm` to avoid lockfile drift.

## Coding Style & Naming Conventions
Code is TypeScript-first with `strict` compiler options. Keep React components functional, typed, and stored in PascalCase files; shared utilities and hooks stay camelCase. Apply Tailwind utility classes in JSX and consolidate shared styles in `app/globals.css`. Run `npm run lint` before committing; only suppress rules with an inline comment that explains the exception.

## Testing Guidelines
No automated test runner ships yet. When adding coverage, colocate specs beside the code (`__tests__/` folders or `.test.tsx` files) and favor Testing Library assertions for UI behavior. Document any manual QA alongside the PR until automated suites exist. Lint must pass as the minimum gate.

## Commit & Pull Request Guidelines
Existing commits are concise, lower-case imperatives (e.g., `empty nextjs projec`). Follow the same tone, keep each commit focused, and reference related work in the body. Pull requests should state intent, outline key implementation details, summarize testing (include command output when relevant), and link to issues or tickets. Attach screenshots or recordings for UI changes and call out follow-up tasks explicitly.
