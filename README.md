# YoPrint Anime TwinEdo

A two-page anime intelligence console built with React 18, TypeScript, Redux Toolkit, Mantine UI, and the public [Jikan](https://docs.api.jikan.moe/) API. Page one offers instant, debounced search with server-side pagination, filters, spotlight content, and a persistent favorites rail. Page two deep dives into an anime with rich metadata, streaming links, and relation graphs.

## Features
- 🔍 **Instant search** with debouncing, race-condition protection, and server-side pagination powered by Redux Toolkit async thunks.
- 🎚️ **Advanced filters** (status, format, and minimum score) plus recent-search shortcuts and meaningful empty/error/skeleton states.
- 📈 **Trends & insights** panel showing top anime, along with contextual stats (average score, episodes, audience reach) for current results.
- 📱 **Responsive, glassmorphic UI** crafted with Mantine components, gradients, and skeleton loaders for a cohesive wow factor.
- 🧪 **Vitest test suite** covering reducers/core logic, plus ready-to-run coverage reporting.

## Getting Started
```bash
npm install
npm run dev
```
Visit http://localhost:5173 and start searching.

## Available Scripts
| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build production assets |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint over the project |
| `npm run test` | Execute the Vitest suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage with `@vitest/coverage-v8` |

## Architecture Notes
- `src/app` holds the Redux store; `features` contains search, detail, and favorites slices.
- `services/jikanClient.ts` centralizes API fetch + error handling and data shaping.
- `components` are organized by domain (search, extras, feedback, shared) for clarity.
- Routes live in `src/router.tsx`; pages consume typed selectors/hooks for state access.
- Global prompts used during development live in [`PROMPTS.md`](./PROMPTS.md).


## Bonus Implementation
- ⭐ **Persistent favorites** backed by `localStorage`, surfaced as a horizontal rail for quick navigation.