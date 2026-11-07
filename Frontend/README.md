# Truth Nuke - Brand Governance and Content Quality Assurance

A premium frontend-only SaaS platform for maintaining brand consistency across all published content.

## Overview

Truth Nuke helps organizations maintain brand consistency by providing AI-assisted content review and quality assurance. The platform analyzes content for:

- **Banned terminology** - Prohibited words and phrases
- **Preferred terminology** - Approved replacements for non-preferred terms
- **Unsupported claims** - Absolute claims requiring substantiation
- **Tone inconsistencies** - Excessive marketing language, ALL CAPS, etc.
- **Accessibility issues** - Missing alt text, vague link text

## Design Language

This application follows the **Frutiger Aero** design language, inspired by:

- Windows Vista/7 Aero Glass effects
- Early 2000s futuristic interfaces
- Nature-inspired technology aesthetics
- Glossy Web 2.0 elements
- Modern glassmorphism

## Tech Stack

### Frontend

- **React JS** (JavaScript, no TypeScript)
- **Vite** for development and building
- **React Router DOM** for navigation
- **React Context API** + **useReducer** for global state
- **localStorage** for persistence
- **lucide-react** for icons

### Styling

- **Tailwind CSS** using the Tailwind CLI (NOT CDN, NOT Vite plugin)
- Custom Frutiger Aero design tokens and components

### Build Tools

- **concurrently** - Run multiple dev processes
- **Tailwind CLI** - Watch and build CSS
- **Vite** - Dev server and production build

### Required Tailwind Files

- `src/styles/input.css`
- `src/styles/output.css`
- `tailwind.config.js`

### npm Scripts

| Script | Description |
|--------|-------------|
| `dev` | Run Vite and Tailwind CSS watch mode simultaneously |
| `dev:css` | Run Tailwind CLI in watch mode |
| `build:css` | Generate production CSS |
| `build` | Generate production-ready application |
| `preview` | Preview production build |

## Architecture

```
src/
├── components/    # Reusable UI components
│   ├── layout/    # Header, Sidebar, main layout
│   ├── common/    # StatusBadge, ActionButton, etc.
│   ├── dashboard/ # Dashboard page
│   ├── guidelines/# Guideline library
│   ├── review/    # Content review screen
│   └── approval/  # Approval workflow
├── pages/         # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Guidelines.jsx
│   ├── NewContent.jsx
│   ├── ContentReview.jsx
│   ├── Approval.jsx
│   └── Settings.jsx
├── context/       # AppContext for auth and state
├── services/      # API and review engine
│   ├── api.js     # API abstraction layer
│   └── reviewEngine.js  # Client-side rule-based review engine
├── data/          # Seed data and mock guidelines
├── hooks/         # Custom React hooks
└── styles/        # Tailwind configuration
```

## Authentication

Mock authentication with three roles:

- **Creator** - Create content, run reviews, accept/reject fixes
- **Manager** - View dashboard, monitor team activity, approve content
- **Reviewer** - View submitted content, approve/reject, add comments

## Key Features

### Content Review Screen (Most Important)

- Split-screen interface with main content panel and findings panel
- Inline issue highlighting matching the findings panel
- Click finding → scroll to and focus corresponding content
- Accept/reject individual fixes
- Accept all / Reject all actions
- Review summary with remaining unresolved issues
- Submit for approval button

### Approval Workflow

- Status stepper: Draft → In Review → Changes Requested → Approved
- Reviewer actions: Approve, Request Changes (requires comment)
- Comment thread with author, role, timestamp
- Revision history tracking all actions
- Chronological ordering of all events

### Guidelines Library

- Categorized banned terms, preferred terminology, claims, tone, accessibility
- Clickable source guidelines opening detail views
- Add new guidelines form

### Settings & Responsible AI

- Appearance (dark mode, notifications, auto-reviews, AI disclosure)
- Data persistence management (localStorage)
- Application information and version
- Responsible AI principles statement

## Getting Started

```bash
# Install dependencies
npm install

# Start development mode (Vite + Tailwind watch)
npm run dev

# Start CSS watch only
npm run dev:css

# Build for production
npm run build

# Preview production build
npm run preview

# Build CSS only
npm run build:css
```

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions.

## Design Tokens

All colors, shadows, gradients, and typography are defined in `tailwind.config.js` for consistent theming and easy customization.

## Responsible AI

The review engine is entirely client-side and rule-based. No real LLM is connected. AI suggestions are clearly marked, and all final decisions rest with human users.

> **Philosophy: AI suggests. Humans decide.**