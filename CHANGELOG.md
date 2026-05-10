# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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
