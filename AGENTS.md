# Repository Guidelines

## Project Structure & Module Organization
- Source code lives in `src/app` (Next.js App Router). Pages: `src/app/page.tsx`, layout: `src/app/layout.tsx`.
- Reusable UI in `src/app/components` (PascalCase files). Static assets in `public/`.
- Build output in `.next/` (never commit). Example assets/sample code in `sample/`.

## Build, Test, and Development Commands
- `npm run dev` — start local dev server (Turbopack) on `http://localhost:3000`.
- `npm run build` — production build.
- `npm run start` — run the production server (after build).
- `npm run lint` — run ESLint (Next core-web-vitals + TypeScript rules).

## Coding Style & Naming Conventions
- Language: TypeScript with `strict` enabled; prefer typed props and return types.
- React: functional components, PascalCase filenames (`NewFooter.tsx`), named exports for reusable pieces where practical.
- Indentation: 2 spaces; keep files focused and small.
- Styling: Tailwind CSS v4 utilities in JSX `className`. Prefer composition over deep custom CSS; put global tokens in `src/app/globals.css`.
- Imports: use path alias `@/*` from `tsconfig.json`.

## Testing Guidelines
- No test runner is configured yet. If adding tests, prefer Vitest + React Testing Library.
- Name tests `*.test.tsx` near the source or under `src/__tests__/`.
- Aim for component tests for key UI and simple mocks for Next APIs.

## Commit & Pull Request Guidelines
- Commits: imperative mood, concise subject (≤72 chars), optional scope, e.g. `feat(header): add sticky nav`.
- PRs: include a clear description, screenshots/GIFs for UI changes, and linked issues.
- Checks: ensure `npm run lint` and `npm run build` pass locally before requesting review.

## Security & Configuration Tips
- Secrets/config in `.env.local` (not committed). Use `NEXT_PUBLIC_` prefix only for values safe for the client.
- Images: Next Image allows `images.unsplash.com` via `next.config.ts`; add other domains via `images.remotePatterns`.

## Agent-Specific Instructions
- Do not commit `.next/` or local env files. Keep component APIs minimal and typed. Avoid adding new dependencies without discussion. Follow existing patterns in `src/app/components` and prefer small, composable UI pieces.
