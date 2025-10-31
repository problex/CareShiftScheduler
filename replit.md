# Shift Scheduler - Care Worker App

## Overview

This is a shift scheduling application designed specifically for care workers to manage their work shifts across two categories: PE Home and Paul. The app provides calendar views (week and month) for easy shift visualization, quick one-tap shift entry, and the ability to share schedules via shareable links. Built as a mobile-first web application with a focus on speed and simplicity.

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
- Week starts on Monday to align with typical work week patterns

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
- `sharedCalendars` table: Stores shareable calendar snapshots with unique share IDs
- Note: Shifts are stored client-side only (no persistence) with JSON serialization for sharing

**API Structure**
- `/api/auth/user` - GET current authenticated user
- `/api/share` - POST to create shareable calendar link
- `/api/share/:shareId` - GET to retrieve shared calendar data
- All data routes protected by authentication middleware except public share views

**Authentication Flow**
- Replit Auth integration using OpenID Connect (OIDC)
- Passport.js strategy for OAuth authentication
- PostgreSQL-backed session store for persistence
- Session TTL of 7 days with secure, httpOnly cookies

**Key Architectural Decisions**
- Shifts stored client-side to minimize database writes and improve performance
- Sharing implemented via snapshot approach (JSON serialization) rather than live sync
- Stateless API design with session-based auth
- Separation of concerns: client state in browser, persistent user data in database

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