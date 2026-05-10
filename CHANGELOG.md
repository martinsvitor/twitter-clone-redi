# Changelog

All notable changes to this project will be documented in this file, organized by feature/branch.

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
