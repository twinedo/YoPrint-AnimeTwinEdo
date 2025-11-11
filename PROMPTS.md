# PROMPTS

## Prompt 1 – Requirements Gathering (Search & Detail experience)
- **Source:** User request inside IDE (this conversation)
- **Context / Usage:** Defined the full scope: build a two-page Anime Search + Detail SPA using React 18+, TypeScript, redux, react-router-dom, Mantine UI, Jikan API integration, debounced search, server-side pagination, responsive UI, error states, skeletons, extra features, and documentation/test expectations. Guided every implementation decision, from state slices and routing to UI polish and test coverage.

## Prompt 2 – Instant Search refinements & Dev Server Port
- **Source:** Follow-up IDE request (this conversation)
- **Context / Usage:** Clarified operational constraints: instant search must debounce at 250 ms and cancel inflight requests, required npm-only workflow, `npm run dev` must bind to port 4000 without env vars, and PROMPTS.md needs updating. Drove the debounce tuning, fetch cancellation check, and Vite server configuration changes.
