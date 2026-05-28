# Changelog

All notable changes to this project will be documented in this file, organized by feature/branch.

## [Authentication & Authorization]

### Added
- Complete authentication system with email/password and Google OAuth support
- NextAuth.js configuration with Prisma adapter for database-backed sessions
- Google OAuth provider integration for social login
- Credentials provider for email/password authentication
- Password hashing utilities using bcrypt (12 salt rounds)
- Password strength validation (8+ chars, mixed case, numbers, special chars)
- Email verification flow with token-based verification
- Password reset functionality with email delivery
- Resend email service for transactional emails (verification, password reset)
- Rate limiting on sensitive endpoints (registration, password reset request)
- User registration endpoint with validation and email verification
- Email verification endpoint with token validation
- Password reset request endpoint with email enumeration prevention
- Password reset completion endpoint with token validation
- Profile management API endpoints (GET, PATCH for profile updates)
- Password change endpoint with current password verification
- Login page with Google OAuth and email/password forms
- Registration page with form validation and password strength checks
- Email verification page with token handling
- Forgot password page for password reset requests
- Password reset page with token validation and password update
- Profile settings page with profile information and password change sections
- Middleware for protected routes (protects /profile/*)
- Database schema updates for authentication (password, emailVerified, Account, Session, VerificationToken models)
- Type definitions for NextAuth session and user
- Rate limiting utilities using rate-limiter-flexible
- OAuth account linking detection in credentials provider

### Changed
- Updated Prisma schema to include authentication fields and NextAuth models
- Updated seed script to include password and emailVerified fields
- Removed bcryptjs dependency (kept only bcrypt)
- Added @types/bcrypt for TypeScript support
- Fixed Zod error handling (changed from .errors to .issues)
- Changed username check from findUnique to findFirst for better flexibility
- Removed avatar and username from NextAuth session callback to reduce session size
- Profile page now fetches data from API instead of relying on session
- Session refresh uses update() hook instead of session?.update?.()
- Renamed middleware.ts to proxy.ts (Next.js deprecated middleware file convention)

### Security Improvements
- Password hashing with bcrypt (12 salt rounds)
- Password strength validation on registration and password change
- Rate limiting on registration (3 requests/hour per IP)
- Rate limiting on password reset request (3 requests/hour per IP)
- Email enumeration prevention in password reset (always returns success)
- Token expiration (24 hours for verification, 1 hour for password reset)
- Tokens deleted after use
- Protected routes via middleware

### Known Limitations
- OAuth account linking not fully implemented (mitigation: error message if user tries credentials with Google account)
- Session cleanup requires cron job (NextAuth only cleans up on access)
- Account cleanup requires cron job for unverified users (7 days)

## [Accessible Theme System]

### Added
- Theme hook (`hooks/use-theme.ts`) with localStorage persistence and system preference detection
- WCAG AA-compliant color palette using CSS variables for light and dark modes
- Header component with theme toggle button (Sun/Moon icons from lucide-react)
- Inline script in layout.tsx to prevent flash of incorrect theme on page load
- Semantic color tokens for consistent theming across components
- Jest testing framework with React Testing Library
- Unit tests for theme hook and Header component
- Theme transition animation for smooth theme changes
- Test scripts (`npm test` and `npm run test:watch`)

### Changed
- Updated all components to use semantic color classes instead of hardcoded Tailwind colors
  - TweetCard: Replaced `text-gray-*` with `text-foreground`, `text-muted`, `border-border`
  - LikeButton: Replaced `text-gray-400` with `text-muted`
  - loading.tsx: Replaced `bg-gray-200` with `bg-muted/30`
- Updated app/page.tsx to use Header component instead of hardcoded h1
- Updated app/tweet/[id]/page.tsx to use Header component
- Configured Tailwind CSS v4 to use CSS variables for semantic color tokens
- Updated tsconfig.json to include Jest type definitions
- Updated background color in global.css

### Fixed
- Theme toggle button not working (removed null return when not mounted, simplified to light/dark toggle)
- Jest configuration issues (moved config files to root, added moduleNameMapper for @/ path resolution)

## [Reshape db.json to Prisma Model]

### Added
- Database transformation script (`script/transform-db.ts`) to convert denormalized posts to normalized structure
- Prisma-generated type imports in `app/lib/definitions.ts` for type consistency
- UI-specific `TweetWithAuthor` type for API responses with joined user data
- Mock user data generation using `@faker-js/faker` with deterministic seeding

### Changed
- Reshaped `db.json` from denormalized posts array to normalized structure matching Prisma schema
  - Separate users, tweets, likes, and dislikes arrays
  - Merged title+body into content field
  - Renamed userId to authorId
  - Added createdAt timestamps
  - Removed tags field (not in Prisma model)
- Updated API routes (`/api/tweets` and `/api/tweets/[id]`) to join user data and compute reaction counts
- Updated all UI components to use `TweetWithAuthor` type instead of raw `Tweet` type
- Updated `app/lib/definitions.ts` to import Prisma-generated types and maintain UI-specific types

### Fixed
- Import path for Prisma types to use correct barrel export from `@/generated/prisma/models`

## [Prisma Database Integration]

### Added
- New Prisma-based API endpoints for PostgreSQL database access
  - `GET /api/tweets-db` - Fetches all tweets from database with author data
  - `GET /api/tweets-db/[id]` - Fetches a single tweet by ID from database with author data
- Database seeding script using `@faker-js/faker` to generate test data
  - Generates 6 users, 20 tweets, likes, retweets, and follow relationships
  - Added `npm run seed` command to package.json

### Changed
- Database schema already in sync with Prisma schema (no migration needed)

### Preserved
- Existing file-based API routes (`/api/tweets` and `/api/tweets/[id]`) kept for educational reference
- Local file storage (`db.json`) maintained to demonstrate both approaches

## [Changelog Refactoring]

### Changed
- Changed changelog format from semantic versioning to feature-based entries for personal project tracking
