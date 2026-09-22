# Furnixo / Adilbay — Frontend Client Documentation Index

Welcome to the frontend client documentation for **Furnixo / Adilbay** — a high-performance, responsive e-commerce web application focused on furniture and modern home decor.

This directory contains specifications, architectural guides, design system tokens, component authoring conventions, and implementation walk-throughs.

---

## 📚 Documentation Directory

| Document | Description | Direct Link |
| :--- | :--- | :--- |
| **Requirements (FRD)** | Frontend Functional Requirements Document (Navigation, Auth, PDP, Filtering, Cart, Room Visualizer) | [Requirment.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/Requirment.md) |
| **Architecture & Onboarding** | Directory structure, dependency rules, code splitting, and performance targets | [architecture.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/architecture.md) |
| **Design System Guidelines** | Semantic color palette, border radii, shadow hierarchy, and typography tokens | [design-system.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/design-system.md) |
| **Component Guidelines** | Standards for creating, structuring, and exporting reusable layout & UI components | [component-guidelines.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/component-guidelines.md) |
| **Animation & Motion** | Framer Motion unified duration scales, spring constants, and reusable motion variants | [animation-guidelines.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/animation-guidelines.md) |
| **Accessibility (a11y)** | WCAG 2.2 AA compliance, keyboard navigation, focus rings, and ARIA guidelines | [accessibility.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/accessibility.md) |
| **Theming Guidelines** | Light/Dark theme system, CSS custom properties, and preventing flash of unstyled content | [theming.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/theming.md) |
| **Implementation Roadmap** | 12-phase delivery roadmap (Phases 0 through 11) from foundation to optimization | [implementation.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/implementation.md) |
| **Phase 1 Walkthrough** | Completed tasks, verification log, and RFC for Enterprise Design System | [walkthrough/phase-1.md](file:///d:/Restart/CodeClub/adilbay/adilbay-client/docs/walkthrough/phase-1.md) |

---

## 💻 Tech Stack Summary

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 (with `@theme` semantic tokens)
- **State & Data Fetching**: TanStack Query (React Query)
- **Forms & Validation**: TanStack Form & Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React (via proxy wrapper)
- **Testing**: Jest & React Testing Library

---

## 📐 Directory Structure Conventions

```
src/
├── app/                  # Next.js App Router Pages and Routes
├── assets/               # Static assets & categorized images
├── components/           # Component library
│   ├── layout/           # App shell layout (Header, Footer, Command Palette)
│   ├── system/           # Critical loading, error boundaries, fallbacks
│   └── ui/               # Reusable Atomic UI elements (Button, Input, Card, Modal, etc.)
├── config/               # Data-only configurations (feature flags, navigation links)
├── constants/            # Programmatic constants (routes, tokens, motion configs)
├── hooks/                # Decoupled utility hooks (useLocalStorage, useFocusTrap, etc.)
├── lib/                  # Shared utilities (cn, debounce, storage, throttle)
├── providers/            # Context Providers (Theme, QueryClient, Motion)
├── services/             # Backend API interaction layer
└── types/                # Shared TypeScript types & interfaces
```

---

## 🔗 Related Resources

- [Client README](file:///d:/Restart/CodeClub/adilbay/adilbay-client/README.md)
- [Server Documentation Index](file:///d:/Restart/CodeClub/adilbay/adilbay-server/docs/README.md)
- [Root Workspace README](file:///d:/Restart/CodeClub/adilbay/README.md)
