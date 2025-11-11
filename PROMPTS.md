# PROMPTS

# Prompt 1 – Requirements Gathering (Search & Detail experience)
## Goal:
build an Anime Search App - a two-page application where users can search for anime and view details.
## Name
YoPrint-AnimeTwinEdo
## Details:
**Page 1:** Search page displaying results
**Page 2:** Detail page for selected anime
API: https://docs.api.jikan.moe/
## Technical Requirements
### Core Stack:
- React 18 or higher
- React hooks only (no class components)
- TypeScript
- react-router-dom for navigation
- Redux for state management
- UI library of your choice
- Single Page App only (no Next.js)
### Functionality:
- Server-side pagination on the search page
- Instant search with debouncing (see details below)
- Must use redux for state management
### User Experience:
- Creative UI with unique "wow" factor
- Skeleton loaders or meaningful loading states
- Empty state and no results handling with helpful messaging
- Mobile responsiveness
- Additional features that enhance the project
### Technical Excellence:
- Proper error handling (network failures, rate limiting, invalid API responses)
- Race condition handling
- Unit or integration tests
## Documentation
- Create a `PROMPTS.md` file in your project root
- Document all prompts you used with AI tools
- Include context about which parts of the project each prompt helped with


# Prompt 2 – Instant Search refinements & Dev Server Port
## Instant Search Implementation
The search bar should work without requiring users to press Enter or click a button:
- Debounce API calls to 250ms intervals to avoid excessive requests
- Cancel any in-flight API requests if the user continues typing
- This prevents making calls on every keystroke while keeping search responsive
### Package Manager and Setup (CRITICAL):
- **You MUST use npm only** - do not use yarn, pnpm, or any other package managers
- Your project must be runnable with these two commands only:
```bash
npm install
npm run dev
```
- The dev server must start on **port 4000**
- **Do not use environment variables** - the app should work immediately after installation
- **Failing to meet these requirements will result in automatic disqualification** - if we cannot simply run `npm install` and `npm run dev` and use your app right away, your submission will not be accepted
## Documentation
please update PROMPST.md

# Prompt 3 - Error When Running
## When running
Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/@reduxjs_toolkit.js?v=9f1276dc' does not provide an export named 'PayloadAction' (at
## Goal
Please fix error issue

# Prompt 4 - Issue when entering Detail page
## Issue when entering detail page
Unexpected Application Error!
Cannot read properties of undefined (reading 'map')
TypeError: Cannot read properties of undefined (reading 'map')
at http://localhost:4000/src/pages/DetailPage.tsx?t=1762883966737:394:32
at Array.map (<anonymous>)
at DetailPage (http://localhost:4000/src/pages/DetailPage.tsx?t=1762883966737:387:106)
at Object.react_stack_bottom_frame (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:18509:20)
at renderWithHooks (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:5654:24)
at updateFunctionComponent (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:7475:21)
at beginWork (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:8525:20)
at runWithFiberInDEV (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:997:72)
at performUnitOfWork (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:12561:98)
at workLoopSync (http://localhost:4000/node_modules/.vite/deps/react-dom_client.js?v=9f1276dc:12424:43)
💿 Hey developer 👋
You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.

# Prompt 5 - avoid any type
## Fix typescript
Avoid 'any' at type/interface
reference to solve:
src/services/jikanClient.ts

goal:
please fix error lint and type at jikanClient.ts

# Prompt 6 - Fix error type
error lint `imageUrl` at 117-124
Type 'string | undefined' is not assignable to type 'string'.
Type 'undefined' is not assignable to type 'string'.
error type `synopsis` at 139
error type `score` at 140
error type `rank` at 141
error type `popularity` at 142
error type `members` at 143
error type `favorites` at 144
error type `status` at 145
error type `rating` at 146
error type `type` at 147
error type `season` at 148
error type `year` at 149
error type `episodes` at 157
error type `duration` at 158
error type `relations` at 178

# Prompt 7 - Issue Jest type
## issue on test searchSlice.test.ts
Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha` and then add 'jest' or 'mocha' to the types field in your tsconfig.

# Prompt 8 - Fix error type when build
## Error at `npm run build`

src/components/extras/FavoritesRail.tsx:28:15 - error TS2322: Type '{ children: Element; key: number; gap: number; component: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>; to: string; className: string; }' is not assignable to type 'IntrinsicAttributes & StackProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'.
  Property 'to' does not exist on type 'IntrinsicAttributes & StackProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'.

28               to={`/anime/${anime.id}`}
                 ~~

src/components/feedback/EmptyState.tsx:3:10 - error TS1484: 'ReactNode' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.

3 import { ReactNode } from 'react'
           ~~~~~~~~~

src/components/search/ResultCard.tsx:34:45 - error TS2345: Argument of type 'number | null | undefined' is not assignable to parameter of type 'number | undefined'.
  Type 'null' is not assignable to type 'number | undefined'.

34           <Text fw={600}>Score {formatScore(anime.score)}</Text>
                                               ~~~~~~~~~~~

src/components/search/ResultCard.tsx:40:30 - error TS2345: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string | undefined'.
  Type 'null' is not assignable to type 'string | undefined'.

40               {formatAirDate(anime.season, anime.year)}
                                ~~~~~~~~~~~~

src/components/search/ResultCard.tsx:58:24 - error TS2345: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string | undefined'.
  Type 'null' is not assignable to type 'string | undefined'.

58           {shortenText(anime.synopsis, 160)}
                          ~~~~~~~~~~~~~~

vite.config.ts:21:3 - error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'.

21   test: {
     ~~~~

  node_modules/vite/dist/node/index.d.ts:3094:18
    3094 declare function defineConfig(config: UserConfigExport): UserConfigExport;
                          ~~~~~~~~~~~~
    The last overload is declared here.


Found 6 errors.
