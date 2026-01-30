# Neon Apps

A modern, full featured staff management dashboard built with Next.js 16, TypeScript, and React Query. This application demonstrates best practices for authentication, data fetching, multi step forms, and role based access control.

## Overview

Neon Apps is a production ready staff management system that showcases:

  Role based authentication and authorization
  Multi step onboarding workflow with state persistence
  Advanced data management with caching and offline support
  Responsive design with light/dark mode
  Type safe development with TypeScript

## Features

  **Authentication System**: Secure login with role based permissions
  **Dashboard**: Real time statistics, announcements, and activity tracking
  **Data Management**: Handles 1000+ records with pagination, search, and filtering
  **Multi Step Onboarding**: Three step form with validation and CSV export
  **Staff Management**: Role based access control for employee data
  **Settings Panel**: Comprehensive application configuration
  **Theme Support**: Light and dark mode with persistent preferences
  **Offline Detection**: Automatic network status monitoring
  **Type Safety**: Full TypeScript coverage across the codebase

## Technology Stack

### Core
  Next.js 16.1.3 (App Router)
  React 19.2.3
  TypeScript 5.x
  Tailwind CSS 4.x

### State Management
  Zustand 5.0.10 (global state)
  TanStack React Query 5.90.20 (server state)

### UI Components
  Radix UI primitives
  Lucide React icons
  Shadcn/ui components

### Forms & Validation
  React Hook Form 7.71.1
  Zod 4.3.5

### Data Fetching
  Axios 1.13.4
  JSONPlaceholder API (demo)

## Installation

### Prerequisites

  Node.js 20.x or higher
  npm or pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/MuhammetEmreNumanoglu/Neon-Apps.git
cd neon apps
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Configure environment variables in `.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (/)
│   ├── login/             # Authentication
│   ├── onboarding/        # Multi step form
│   ├── data demo/         # Data management demo
│   ├── staff/             # Staff management (protected)
│   ├── settings/          # Application settings (protected)
│   ├── announcements/     # Announcements with dynamic routes
│   └── statistics/        # Statistics page (protected)
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── Header.tsx        # Application header
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── LoginForm.tsx     # Authentication form
│   ├── OnboardingForm.tsx # Multi step onboarding
│   └── ProtectedRoute.tsx # Route protection HOC
├── stores/               # Zustand state stores
│   ├── auth.ts          # Authentication state
│   └── onboardingStore.ts # Onboarding state machine
├── hooks/                # Custom React hooks
│   └── useDataQueries.ts # React Query data hooks
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   ├── axios.ts         # Axios configuration
│   ├── api.ts           # API client
│   ├── csvExport.ts     # CSV generation
│   └── zodiacSigns.ts   # Data transformation utilities
├── data/                 # Static data and mock datasets
│   ├── dashboard.ts     # Dashboard content
│   └── staff.ts         # Staff permissions
└── types/                # TypeScript type definitions
    └── *.ts             # Type definitions for all modules
```

## Authentication

### Test Accounts

The application includes pre configured test accounts for demonstration:

**Administrator:**
  Email: `admin@test.com`
  Password: `admin123`
  Permissions: Full access to all features

**Manager:**
  Email: `manager@test.com`
  Password: `manager123`
  Permissions: Access to staff, statistics, and settings

**Employee:**
  Email: `employee@test.com`
  Password: `employee123`
  Permissions: Basic access to dashboard and settings

### Protected Routes

Routes are protected based on user permissions. Access control is enforced through:

  Authentication check (all protected routes)
  Permission based filtering (staff, statistics)
  Role based UI rendering (sidebar menu items)

## Key Features Explained

### Data Management (React Query)

The `/data demo` page demonstrates advanced data fetching:

  Fetches 1000+ records from JSONPlaceholder API
  Client side pagination (100 items per page)
  Search and filter capabilities
  Batch delete operations
  Skeleton loading states
  Offline detection with cached data fallback
  Manual refetch with loading indicators
  5 minute stale time, 10 minute garbage collection

### Onboarding Flow

Multi step form with three stages:

1. **Identity**: Name, surname, zodiac sign
2. **Professional**: Department, role
3. **Confirmation**: Review and submit

Features:
  URL synchronization with query parameters
  Form validation with Zod
  State persistence with Zustand
  CSV export on submission
  Browser refresh warning (prevents data loss)

### Theme System

Application supports light and dark themes:

  Persistent theme storage
  Automatic system preference detection
  Seamless theme switching
  Tailwind CSS dark mode classes

## Development Guidelines

### Adding New Pages

1. Create page file in `src/app/[page name]/page.tsx`
2. Add route to sidebar menu items if needed
3. Wrap with `ProtectedRoute` for authenticated access
4. Define TypeScript types in `src/types/`

### State Management

  **Global UI State**: Use Zustand stores
  **Server Data**: Use React Query hooks
  **Local Component State**: Use React `useState`

### Styling

  Use Tailwind CSS utility classes
  Follow existing design tokens
  Add dark mode variants with `dark:` prefix
  Use responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### Type Safety

All components and functions are fully typed. Type definitions are centralized in `src/types/` for consistency.

## API Integration

The application uses JSONPlaceholder as a demo API. To integrate your own backend:

1. Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Modify API client in `src/lib/api.ts`
3. Update type definitions to match your API responses
4. Adjust React Query hooks in `src/hooks/useDataQueries.ts`

## Build and Deployment

Create a production build:

```bash
npm run build
```

The build process:
  Optimizes JavaScript bundles
  Pre renders static pages
  Validates TypeScript types
  Runs ESLint checks

Start the production server:

```bash
npm run start
```

## Browser Support

  Chrome (latest)
  Firefox (latest)
  Safari (latest)
  Edge (latest)

## Performance Optimizations

  React Query caching reduces API calls
  Image optimization with Next.js Image component
  Code splitting via Next.js App Router
  Lazy loading for components
  Memoization for expensive computations

## Security Considerations

  Client side authentication (demonstration only)
  Role based access control
  Protected routes with permission checks
  Environment variables for sensitive data
  Input validation with Zod schemas

**Production Note**: This implementation uses client side authentication for demonstration. A production application requires server side session management, secure token handling, and backend API authentication.

## Known Limitations

  Authentication is client side only (no backend)
  Data persistence uses local storage (no database)
  CSV export is client side only
  No real time data synchronization

## License

This project is private and proprietary.

## Documentation

For detailed technical documentation, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md).
