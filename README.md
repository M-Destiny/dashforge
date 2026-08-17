# ⚡ DashForge

> Modern React admin dashboard with metrics, charts, and user management.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHFORGE ARCHITECTURE                         │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      Sidebar (collapsible)                │   │
│  │  Logo  │ Dashboard │ Users │ Reports │ Settings          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    TopBar (breadcrumbs + theme)          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Revenue  │  │  Users   │  │ Sessions │  │ Bounce   │    │
│  │  Metric  │  │  Metric  │  │  Metric  │  │  Metric  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                                  │
│  ┌────────────────────────────┐ ┌─────────────────────────┐   │
│  │    AreaChart (7d trend)   │ │   BarChart (top pages) │   │
│  └────────────────────────────┘ └─────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              UserTable (sortable, paginated)              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, Vite 5 |
| Language | TypeScript 5 (strict mode) |
| Styling | TailwindCSS 3 |
| Charts | Recharts |
| State | Zustand (with persist middleware) |
| Routing | React Router 6 |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library |
| Linting | ESLint 10 + TypeScript ESLint |
| Formatting | Prettier |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- **Dark/Light theme toggle** — Persisted in localStorage
- **Responsive metric cards** with trend indicators (up/down)
- **Recharts AreaChart + BarChart** — Interactive, responsive charts
- **Sortable user table** with search and filtering
- **Collapsible sidebar navigation** with React Router 6
- **Code-split pages** via React.lazy + Suspense
- **Persisted state** (sidebar, theme, users) via Zustand middleware
- **Comprehensive test suite** — 34 tests covering store, app, components, and TopBar
- **TypeScript strict mode** — Full type safety
- **Accessible markup** — Semantic HTML, ARIA labels, keyboard navigation

## Pages

| Route | Component | Description |
|---|---|---|
| `/dashboard` | `Dashboard.tsx` | Metric cards, area chart, bar chart |
| `/users` | `Users.tsx` | User management table with search/sort |
| `/reports` | `Reports.tsx` | Date-range filter, summary cards, charts, detailed table |
| `/settings` | `Settings.tsx` | Theme toggle, notification preferences |

## Project Structure

```
dashforge/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Charts.tsx    # AreaChart + BarChart (Recharts)
│   │   ├── MetricCard.tsx
│   │   ├── Sidebar.tsx
│   │   └── UserTable.tsx
│   ├── pages/            # Route-level components (lazy-loaded)
│   │   ├── Dashboard.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   └── Users.tsx
│   ├── store/
│   │   ├── dashboard.ts  # Zustand store with persistence
│   │   └── dashboard.test.ts
│   ├── types.ts          # TypeScript interfaces
│   ├── App.tsx           # Root layout + routing
│   ├── App.test.tsx
│   └── main.tsx          # React 18 root
├── dist/                 # Production build output
├── .github/workflows/    # CI/CD (optional)
├── .gitignore
├── eslint.config.js
├── fly.toml              # Fly.io deployment
├── index.html
├── package.json
├── postcss.config.js
├── prettier.config.js
├── railway.json          # Railway deployment
├── README.md
├── render.yaml           # Render deployment
├── SPEC.md               # Specification (Spec Kit approach)
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json           # Vercel deployment
├── vite.config.ts
└── vitest.config.ts
```

## Deployment

| Platform | Config | Command |
|---|---|---|
| **Vercel** | `vercel.json` | Import repo → auto-deploy |
| **Fly.io** | `fly.toml` | `fly launch && fly deploy` |
| **Railway** | `railway.json` | Connect repo → auto-deploy |
| **Render** | `render.yaml` | Connect repo → auto-deploy |
| **Static hosting** | `dist/` | Upload `dist/` folder |

### Vercel (Static)

```json
// vercel.json - serves index.html for SPA routing
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Fly.io (Docker)

```toml
# fly.toml - uses Nixpacks for Node.js build
app = "dashforge"
primary_region = "iad"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"

[[services]]
  internal_port = 8080
  protocol = "http"
  [[services.ports]]
    port = 80
```

### Railway

```json
// railway.json - NIXPACKS with Node.js 20
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "NIXPACKS", "nixpacksPkgs": ["nodejs_20"] },
  "deploy": { "numReplicas": 1, "restartPolicyType": "ON_FAILURE", "restartPolicyMaxRetries": 3 }
}
```

### Render

```yaml
# render.yaml - static site on free tier
services:
  - type: web
    name: dashforge
    runtime: node
    region: oregon
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm run preview
```

## Development

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (CI)
npm run test:run

# With UI
npm run test:ui
```

### Linting & Formatting

```bash
# Check linting
npm run lint

# Auto-fix linting
npm run lint:fix

# Format with Prettier
npm run format
```

### Type Checking

```bash
# TypeScript strict mode
npm run typecheck
```

## Scripts

| Script | Description |
|---|---|
| `dev` | Start Vite dev server |
| `build` | Type check + production build |
| `preview` | Preview production build |
| `test` | Run tests in watch mode |
| `test:run` | Run tests once (CI) |
| `test:ui` | Open Vitest UI |
| `lint` | Run ESLint |
| `lint:fix` | Fix ESLint issues |
| `format` | Format with Prettier |
| `typecheck` | Run `tsc --noEmit` |

## License

MIT — M-Destiny