# CLAUDE.md

## Project Overview

UX Playbook is a single-page React application that visualizes UX best practices in an ease-vs-impact matrix. Users navigate between categories (e.g., Home/Landing Page, Menu & Navigation, Search) and see recommendations plotted on a grid along with a detailed table view.

**Tech stack:** React 16.8 (class components), Create React App 3.0.1, JavaScript (no TypeScript), CSS Modules.

## Repository Structure

```
src/
  App.js              # Root component, holds selected category state
  App.css             # Global app styles
  Matrix.js           # Ease/impact grid visualization and table view
  Matrix.module.css   # Matrix component styles
  Stepper.js          # Category navigation tabs
  Stepper.module.css  # Stepper component styles
  Items.js            # Static data: all UX recommendations by category
  App.test.js         # Smoke test
  index.js            # React entry point
  index.css           # Base styles
  serviceWorker.js    # PWA service worker (CRA default)
public/
  index.html          # HTML template
  manifest.json       # PWA manifest
```

## Development Commands

```bash
yarn start    # Local dev server (http://localhost:3000)
yarn build    # Production build to /build
yarn test     # Run tests (react-scripts, watch mode)
yarn deploy   # Build and deploy to GitHub Pages
```

## Architecture & Patterns

- **Class components** throughout — no hooks or functional components with state
- **CSS Modules** for component-scoped styles (`*.module.css`), imported as `styles` object. Plain CSS files for global styles
- **No router** — navigation is state-driven in `App.js` via `this.state.selected`
- **No state management library** — state lives in `App`, passed down as props
- **Static data** in `Items.js` — no API calls or backend
- **FontAwesome** for icons (`@fortawesome/react-fontawesome`), **react-tooltip** for hover tooltips

## Code Conventions

- PascalCase filenames for components (`Matrix.js`, `Stepper.js`)
- CSS Modules imported as `styles`: `import styles from './Component.module.css'`
- Method binding via `.bind(this)` in JSX
- ESLint config: extends `"react-app"` (CRA default, configured in `package.json`)
- No Prettier config — use CRA defaults
- Commit messages: short, lowercase, descriptive (e.g., "added gh-pages", "fix warnings")

## Data Structure (Items.js)

Exports a single object where keys are category names and values are arrays of recommendation objects:

```js
{
  "Home / Landing Page": [
    { name: "...", ease: 1-3, impact: 1-3, keyMetric: ["metric1", "metric2"] },
    ...
  ],
  "Menu & Navigation": [...],
  "Search": [...],
  "Category / product": [...],
  "Conversion": [...],
  "Form optimization": [...]
}
```

`ease` and `impact` are integers 1-3 (low to high). `keyMetric` is an array of metric name strings.

## CI/CD

- **GitHub Actions** (`.github/workflows/main.yml`): triggers on push/PR to `master`, deploys to GitHub Pages
- **Travis CI** (`.travis.yml`): legacy config, runs build/test/deploy + Lighthouse audit
- **Deployed at:** https://chachakawooka.github.io/ux-playbook

## Testing

Single smoke test in `src/App.test.js` — verifies the App component renders without crashing. Run with `yarn test`.
