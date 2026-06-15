# NurseLab Members Area

Premium membership platform with glassmorphism homepage, Netflix-style dashboard, and comprehensive design system.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Project Structure

```
src/
├── components/
│   ├── icons/
│   │   └── Icon.tsx          # Unified icon component with active/filled states
│   ├── layout/               # Layout components (future)
│   └── ui/                    # Reusable UI components (future)
├── lib/
│   └── utils.ts              # cn() utility for class merging
├── pages/
│   ├── WelcomePage.tsx       # Glassmorphism homepage (01)
│   ├── DashboardPage.tsx     # Netflix dark dashboard (02)
│   └── DesignSystemPage.tsx  # Design tokens showcase (03)
├── App.tsx                   # Root router
├── main.tsx                  # Entry point
└── index.css                 # Tailwind + custom styles
```

## Design System

### Colors

- Primary Red: `#D91F27`
- White: `#FFFFFF`
- Soft Gray: `#9C9D9D`
- Black Scale: `#08090B` to `#17191E`

### Typography

- Font: Muller (fallback Inter)
- Weights: Light (300), Regular (400), Medium (500), Bold (700)
- Scales: Display, Page Title, Section Title, Card Title, Body, Caption

### Icons

- Minimal stroke style, 20px default
- Active state: filled with primary red
- Inactive state: stroke soft gray

### Glassmorphism

- Background: `rgba(255,255,255,0.08)`
- Blur: `blur(24px)`
- Border: `1px solid rgba(255,255,255,0.16)`
- Shadow: `0 20px 60px rgba(0,0,0,0.38)`

### Motion

- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Duration: 0.35s

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Routes

- `/` – Welcome glassmorphism page
- `/dashboard` – Netflix-style dashboard
- `/design-system` – Complete design tokens reference

## Notes

All visual specs faithfully implemented from the three reference images:
1. Glassmorphism homepage with floating navbar, hero card, and bottom menu
2. Netflix dark dashboard with sidebar, header, hero banner, and cards
3. Design system showcasing colors, typography, icons, radius, shadows, glass tokens
