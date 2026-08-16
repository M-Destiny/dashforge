# DashForge — Specification

> **Spec Kit: graphify + ponytail development approach**

## 1. Concept & Vision

DashForge is a modern admin dashboard built with React and TailwindCSS. Displays metrics, charts, and user management in a clean, dark/light themeable interface. Designed as a production-ready starter kit for SaaS backends.

## 2. Architecture

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

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, Vite 5 |
| Language | TypeScript 5 |
| Styling | TailwindCSS 3 |
| Charts | Recharts |
| State | Zustand |
| Routing | React Router 6 |
| Icons | Lucide React |

## 4. Ponytail — Task Breakdown

### Phase 1: Setup
1. `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`

### Phase 2: Core
2. `src/types.ts` — Metric, ChartData, User, Notification, SidebarLink interfaces
3. `src/store/dashboard.ts` — Zustand store
4. `src/App.tsx` — layout with sidebar + main
5. `src/main.tsx` — React root

### Phase 3: Components
6. `src/components/Sidebar.tsx` — collapsible nav
7. `src/components/MetricCard.tsx` — stat card with trend
8. `src/components/Charts.tsx` — AreaChart + BarChart
9. `src/components/UserTable.tsx` — sortable table

### Phase 4: Pages
10. `src/pages/Dashboard.tsx` — main metrics page
11. `src/pages/Users.tsx` — user management
12. `src/pages/Settings.tsx` — theme toggle

### Phase 5: Deploy
13. `vercel.json`, `fly.toml`, `railway.json`, `render.yaml`

## 5. Milestones

- [x] Phase 1-2: Setup + core (this build)
- [x] Phase 3-4: Components + pages
- [x] Phase 5: Deployment configs
