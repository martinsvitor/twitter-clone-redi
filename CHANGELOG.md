# Changelog

All notable changes to this project will be documented in this file, organized by feature/branch.

## [User Profiles & Protected Routes]

### Added
- User profile page (`app/(protected)/users/[id]/profile/page.tsx`) with protected route middleware
- Profile page client component with handle editing functionality
- User search endpoint (`GET /api/search`) for finding users by handle, name, or username
- Custom error classes (`app/lib/errors.ts`) for ConflictError, NotFoundError, and InternalError
- Protected route middleware (`proxy.ts`) using NextAuth.js auth function
- Database query functions: `getUser`, `searchUsers`, and `updateHandle` in `app/lib/queries.ts`
- User avatar display in Navbar with fallback to initials
- Profile statistics display (tweets, followers, following counts)
- Handle editing with validation and conflict detection
- Account details section for profile owners (email, user ID)

### Changed
- Enhanced NextAuth.js configuration with custom adapter for user creation
- Added JWT callbacks to include user ID in session token
- Updated Prisma schema: fixed typo (refres_token → refresh_token), added emailVerified field, added unique constraint on Account model
- Simplified avatar generation to use DiceBear API instead of local generation
- Refactored Navbar component into smaller sub-components (NavLogo, ThemeToggle, AuthSection, UserAvatar, UserMenu)
- Updated profile link in Navbar to use user ID instead of handle
- Enhanced error handling in database queries with custom error types

### Removed
- Old search endpoint (`app/api/auth/search/route.ts`) - replaced with unified `/api/search`
- Old profile endpoint (`app/api/auth/users/[id]/profile/route.ts`) - replaced with server component approach

## [User Authentication & OAuth Integration]

### Added
- NextAuth.js authentication system with OAuth providers (Google and GitHub)
- User registration endpoint (`POST /api/auth/register`) for email/password signup
- Authentication page (`app/auth/page.tsx`) with sign-in/sign-up functionality
- Navigation bar component (`components/Navbar.tsx`) replacing Header component
- Sign-in and sign-out buttons with session management
- Authentication form components (AuthForm, AuthTabs, OAuthButtons)
- Custom OAuth icons (GitHubIcon, GoogleIcon)
- Authentication form hook (`hooks/use-auth-form.ts`) for form state management
- NextAuth configuration (`auth.ts`) with session and JWT strategy
- Database queries module (`app/lib/queries.ts`) for Prisma operations
- Utility functions module (`app/lib/utils.ts`) for common helpers
- Twitter-like bird logo (`public/bird-logo.svg`)
- Prisma migrations for user authentication models (Account, Session, User)
- Refresh token expiration support in database schema
- Updated seed script with user authentication data

### Changed
- Replaced Header component with Navbar component (removed Header.tsx and tests)
- Updated Prisma schema to include authentication models (User, Account, Session)
- Enhanced database transformation script to handle authentication data
- Updated global styles for authentication UI components
- Modified layout.tsx to support authentication session provider
- Updated API routes to integrate with authentication system
- Enhanced package.json with NextAuth.js and related dependencies
- Updated .gitignore for better file exclusion

### Removed
- Old Header component and its tests (Header.tsx, Header.test.tsx)
- Database-specific API endpoints (/api/tweets-db/*) - consolidated into main tweet endpoints
- Old data.ts file (replaced by queries.ts and utils.ts)

### Fixed
- Database schema alignment with NextAuth.js requirements
- Session management and token expiration handling

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
