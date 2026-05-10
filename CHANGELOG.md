# Changelog

All notable changes to this project will be documented in this file, organized by feature/branch.

## [Accessible Theme System]

### Added
- Theme hook (`hooks/use-theme.ts`) with localStorage persistence and system preference detection
- WCAG AA-compliant color palette using CSS variables for light and dark modes
- Header component with theme toggle button (Sun/Moon icons from lucide-react)
- Inline script in layout.tsx to prevent flash of incorrect theme on page load
- Semantic color tokens for consistent theming across components
- Jest testing framework with React Testing Library
- Unit tests for theme hook and Header component
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
