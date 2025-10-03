# Repository Guidelines

## Project Structure & Module Organization
The Next.js App Router lives under `app/`; `layout.tsx` wires fonts and shared UI, while `page.tsx` renders the landing view. Shared UI primitives reside in `components/`, reusable logic in `lib/`, and static assets (SVGs, icons, favicons) in `public/`. TypeScript tooling and configuration files (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`) stay at the repository root. Use the `@/` alias (configured in `tsconfig.json`) for cross-module imports instead of relative `../../` chains.

## Build, Test, and Development Commands
Run `npm run dev` to start the local dev server with Turbopack hot reload. Ship-ready bundles come from `npm run build`, followed by `npm run start` to verify the optimized output. Lint the codebase with `npm run lint`; treat warnings as blockers. If you add scripts, keep them in `package.json` and document usage inline.

## Coding Style & Naming Conventions
Write strictly typed React function components in PascalCase files (for example, `components/Header.tsx`). Co-locate shared hooks and utilities in camelCase modules under `lib/`. Apply Tailwind classes directly within JSX and extract shared layers into `app/globals.css` when duplication grows. Prefer descriptive prop names, avoid implicit any, and keep indentation at two spaces. Autofix trivial linting issues via `npm run lint -- --fix`, but never silence rules without an explanatory comment.

## Testing Guidelines
No automated suite ships today. When adding coverage, colocate tests beside the target file using `Component.test.tsx` or `__tests__/hook.test.ts`. Favor Testing Library for UI interactions and document manual QA steps in your PR body until automation exists. Keep mocks lightweight and include at least one assertion that guards each critical behavior.

## Commit & Pull Request Guidelines
Commits follow lower-case imperatives (`add hero layout`) and should focus on a single concern. In PRs, summarize intent, implementation highlights, manual or automated test output, and link any tracking issues. Attach screenshots or screen recordings for UI-facing changes, and call out TODOs or follow-up work explicitly.
