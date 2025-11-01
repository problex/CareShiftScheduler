# Shift Scheduler - Care Worker App

## Overview

This is a shift scheduling application designed specifically for care workers to manage their work shifts across two categories: PE Home and Paul. The app provides calendar views (week and month) for easy shift visualization, quick one-tap shift entry, pay tracking per shift, a date range pay calculator for summing earnings, and the ability to share schedules via shareable links. Built as a mobile-first web application with a focus on speed and simplicity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching

**UI Component Library**
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Design system inspired by Material Design, Linear, and Google Calendar
- Custom color system with support for light/dark modes via CSS variables
- Mobile-optimized with touch-friendly interactions (minimum 44x44px touch targets)

**State Management**
- Local component state for UI interactions (calendar navigation, modals)
- TanStack Query for server state (user data, shared calendars)
- No global state management library - leveraging React Query's cache

**Key Design Decisions**
- Mobile-first responsive design with single-column layouts
- Inter font family from Google Fonts CDN for consistent typography
- Color-coded shift categories (PE Home and Paul) for instant visual recognition
- Week starts on Sunday (Sunday-Saturday format)
- Shift type labels with Lucide React icons (Sun icon for Day shifts: 6am-7am, 7am-3pm; Moon icon for Evening shifts: 3pm-11pm, 11pm-12am)
- Pay tracking: Users can enter a dollar amount for each shift above the notes field
- Pay calculator: Collapsible section at top of Home page allows users to calculate total pay between any start and end date
- Notes feature allows users to add optional notes to shifts, viewable by clicking on shift cards
- Edit capability: Users can edit or add pay and notes to existing shifts via the shift details modal

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the full stack
- Session-based authentication using express-session

**Database Layer**
- Drizzle ORM for type-safe database queries
- Neon serverless PostgreSQL as the database provider
- WebSocket support for Neon connections via ws package
- Schema-first approach with shared types between client and server

**Database Schema**
- `users` table: Stores user profiles from Replit Auth
- `sessions` table: Manages authentication sessions (required for Replit Auth)
- `shifts` table: Stores all user shifts with date, timeSlot, category, shiftName, optional pay field (numeric with 2 decimal places), and optional notes field
- `sharedCalendars` table: Stores shareable calendar links with userId references for live calendar sharing

**API Structure**
- `/api/auth/user` - GET current authenticated user
- `/api/shifts` - GET all shifts for the current user
- `/api/shifts` - POST to create a new shift (body: {date, timeSlot, category, shiftName?, pay?, notes?})
- `/api/shifts/:id` - PATCH to update pay and notes for an existing shift (body: {pay?, notes?})
- `/api/shifts/:id` - DELETE to remove a shift
- `/api/share` - POST to create shareable calendar link
- `/api/share/:shareId` - GET to retrieve live shared calendar data for a user
- All data routes protected by authentication middleware except public share views

**Authentication Flow**
- Replit Auth integration using OpenID Connect (OIDC)
- Passport.js strategy for OAuth authentication
- PostgreSQL-backed session store for persistence
- Session TTL of 7 days with secure, httpOnly cookies
- Auth flow optimized to not request consent on repeat logins for better UX

**Key Architectural Decisions**
- Shifts stored in PostgreSQL database for persistent data across sessions
- Sharing implemented via live links that reference userId for real-time calendar viewing
- Stateless API design with session-based auth
- Pay tracking: Optional numeric field (precision 10, scale 2) to store dollar amounts per shift
- Pay calculator: Client-side date range filtering and summation with validation for empty/invalid date ranges
- Notes feature allows optional text annotations on shifts, displayed in ViewShiftModal
- Edit functionality: Users can update pay and notes via PATCH endpoint; empty values send null to clear fields
- Modal state management: Shift updates immediately refresh the modal display without requiring reopening
- Empty optional fields (pay, notes) are converted to null for updates (clearing) or undefined for creation
- Separation of concerns: UI state in React components, persistent shift data in database

### External Dependencies

**Authentication & Identity**
- Replit Auth (OIDC provider) for user authentication
- OpenID Client library for OAuth/OIDC flows
- Passport.js for authentication middleware

**Database & ORM**
- Neon Serverless PostgreSQL for database hosting
- Drizzle ORM for database queries and migrations
- connect-pg-simple for PostgreSQL session store

**UI Component Libraries**
- Radix UI primitives (40+ components: Dialog, Popover, Select, etc.)
- Lucide React for icons
- date-fns for date manipulation and formatting
- class-variance-authority (CVA) for component variant styling
- tailwind-merge and clsx for conditional class name composition

**Utility Libraries**
- nanoid for generating unique share IDs
- memoizee for caching OIDC configuration
- zod for runtime schema validation
- react-hook-form with @hookform/resolvers for form handling

**Development Tools**
- Vite plugins for Replit integration (error overlay, dev banner, cartographer)
- tsx for TypeScript execution in development
- esbuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

**Key Integration Points**
- Google Fonts CDN for Inter font family
- Replit's OIDC endpoint for authentication flow
- Neon's WebSocket connection for serverless PostgreSQL