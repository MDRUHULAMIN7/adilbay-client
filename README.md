# Furnixo / Adilbay — Frontend Web Application

A modern, responsive, high-performance E-Commerce frontend web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **TanStack Query / Form**.

---

## 🚀 Key Highlights & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme` CSS custom properties
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions and micro-interactions
- **State & Server Cache**: [@tanstack/react-query](https://tanstack.com/query)
- **Forms & Validation**: [@tanstack/react-form](https://tanstack.com/form) + Zod
- **Icons**: [Lucide React](https://lucide.dev/) (wrapped via `@/components/ui/icon`)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

---

## 📂 Project Architecture

```
adilbay-client/
├── docs/                     # Detailed Client Documentation & Specifications
│   ├── README.md             # Docs Index
│   ├── Requirment.md         # Functional Requirements Document (FRD)
│   ├── architecture.md       # Directory structure & performance rules
│   ├── design-system.md      # Semantic colors, radii, shadows, typography
│   ├── component-guidelines.md# Component creation & barrel export standards
│   ├── animation-guidelines.md# Framer Motion spring constants & variants
│   ├── accessibility.md      # WCAG AA, focus trap, ARIA requirements
│   ├── theming.md            # Light / Dark theme & flash prevention
│   ├── implementation.md     # 12-phase implementation roadmap
│   └── walkthrough/          # Phase walkthroughs (Phase 1 Design System)
├── public/                   # Static assets, fonts, icons
├── src/
│   ├── app/                  # Next.js App Router (Layouts, Pages, Routes)
│   ├── components/           # Component library
│   │   ├── layout/           # Global Header, Footer, Navigation, Command Palette
│   │   ├── system/           # Fallbacks, theme injection, error boundaries
│   │   └── ui/               # Atomic UI components (Button, Input, Card, Modal, etc.)
│   ├── config/               # Navigation menus, site metadata, feature flags
│   ├── constants/            # Design tokens, motion variants, route paths
│   ├── hooks/                # Reusable custom React hooks
│   ├── lib/                  # Shared utilities (cn, storage, debounce, throttle)
│   ├── providers/            # React providers (Theme, Query, Motion)
│   └── types/                # Shared TypeScript types & interfaces
├── scripts/                  # Development scripts (token audits, generators)
└── jest.config.ts            # Jest configuration
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or v20.x+
- **npm**: v9+ (or `pnpm` / `yarn`)

### 2. Installation
```bash
cd adilbay-client
npm install
```

### 3. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3100
```

### 4. Running Locally
```bash
# Start development server on port 3100
npm run dev

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Audit design token compliance
npm run audit:tokens

# Build production bundle
npm run build

# Start production server
npm start
```

Visit [http://localhost:3100](http://localhost:3100) to view the application.

---

## 🎨 Design System & Theming

- **Semantic Color Palette**: Uses CSS variables (`--color-background`, `--color-card`, `--color-brand-*`) to support seamless Light and Dark modes.
- **Hydration Flash Prevention**: Custom `ThemeProvider` with inline `<head>` script prevents any visual flicker on initial load.
- **Component Guidelines**: Every component lives in its own subdirectory with strict barrel exports (`index.ts`) and separated logic hooks.

---

## 📖 In-Depth Documentation

For full details on frontend architecture and component specs:
- [Frontend Documentation Index](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/README.md)
- [Requirements (FRD)](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/Requirment.md)
- [Design System Standards](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/design-system.md)
- [Component Authoring Guidelines](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/component-guidelines.md)
- [Root Workspace README](file:///d:/Restart/CodeClub/adilbay/README.md)
