# NeonApps Codebase Guide

## Architecture Overview

This is a Next.js 16 application using the App Router with TypeScript. The app is a staff directory system with authentication and role-based access control.

### Key Technologies
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand with persist middleware
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toasts
- **Theming**: next-themes

### Project Structure
```
src/
├── app/                 # Next.js app router pages
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx        # Home page (staff directory)
│   └── login/          # Login page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── LoginForm.tsx  # Authentication form
│   ├── StaffCard.tsx  # Staff member display
│   ├── Sidebar.tsx    # Navigation sidebar
│   └── ProtectedRoute.tsx # Route protection HOC
├── stores/            # Zustand stores
│   └── auth.ts        # Authentication store
├── hooks/             # Custom hooks
│   └── useAuth.ts     # Auth-related hooks
├── lib/               # Utilities
│   ├── auth.ts        # Auth service
│   └── utils.ts       # General utilities
├── data/              # Static data
│   └── staff.ts       # Staff member data
└── types/             # TypeScript definitions
    └── staff.ts       # Staff-related types
```

## Development Workflows

### Running the Application
```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Authentication Flow
- Login form validates email (must end with @neonapps.com) and password
- On successful login, user data is stored in Zustand with persist
- Protected routes check authentication status
-  clears store and redirects to /login

### Role-Based Access
- User roles: 'Admin' | 'Employee'
- Menu items in Sidebar filter based on user role
- ProtectedRoute HOC can restrict access by role
- useHasRole hook checks permissions anywhere in component tree

## Code Patterns & Conventions

### Component Structure
- Use "use client" directive for client components
- Export default function components
- Use PascalCase for component names
- Place related components in same directory

### State Management
```typescript
// Store definition with persist
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({ /* state */ }),
    { name: 'auth-storage' }
  )
);

// Usage in components
const { user, login, logout } = useAuthStore();
```

### Form Validation
```typescript
// Zod schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// React Hook Form
const form = useForm({
  resolver: zodResolver(schema)
});
```

### Styling
- Use Tailwind utility classes
- Follow shadcn/ui component patterns
- Theme-aware classes (dark/light mode support)
- Responsive design with sm/lg breakpoints

### Error Handling
- Use try/catch in async operations
- Show user-friendly messages via Sonner toasts
- Log errors to console for debugging

## Key Integration Points

### Authentication
- Mock auth service in `src/lib/auth.ts`
- Real implementation should replace with API calls
- Store persists user session in localStorage

### Data Management
- Staff data currently static in `src/data/staff.ts`
- Replace with API calls for dynamic data
- Consider adding data fetching hooks

### Theming
- ThemeProvider wraps app in `layout.tsx`
- Toggle via Sidebar theme switcher
- Supports system preference detection

### Navigation
- Sidebar renders menu items based on user role
- MenuItem interface defines label, href, roles, icon
- Active link highlighting not implemented (add as needed)

## Common Tasks

### Adding New Pages
1. Create directory in `src/app/`
2. Add `page.tsx` with component
3. Wrap with ProtectedRoute if needed
4. Add to Sidebar menuItems if applicable

### Adding Form Components
1. Define Zod schema for validation
2. Use React Hook Form with zodResolver
3. Handle submit with async/await
4. Show success/error toasts

### Adding UI Components
1. Check if shadcn/ui has the component
2. If not, create in `src/components/ui/`
3. Follow existing component patterns
4. Export from index if needed

### Role-Based Features
1. Use useHasRole hook for conditional rendering
2. Add roles array to menu items
3. Use ProtectedRoute with requiredRole prop

## Security Considerations
- Client-side authentication only
- Add server-side validation for production
- Implement proper session management
- Add CSRF protection for forms
- Validate all user inputs on server

## Performance Notes
- Components are client-side rendered
- Static staff data loads instantly
- Consider code splitting for large components
- Optimize images and assets
- Monitor bundle size with build output