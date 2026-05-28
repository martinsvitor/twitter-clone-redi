# Twitter Clone - ReDI School Web Development Bootcamp

A comprehensive Twitter clone built with modern web technologies, designed specifically for teaching web development concepts at ReDI School. This project demonstrates full-stack development with React, Next.js, TypeScript, and database integration.

## 🎯 Learning Objectives

This project is designed to teach students:

- **Frontend Development**: React components, TypeScript, modern CSS with Tailwind
- **Backend Development**: API routes, database integration with Prisma
- **Full-Stack Architecture**: How frontend and backend work together
- **Database Design**: Schema design, relationships, and migrations
- **Modern Development Practices**: Component-based architecture, type safety, responsive design

## 🛠️ Tech Stack & Dependencies

### Core Dependencies (Required for Production)

#### Frontend & Framework
- **next (16.2.4)** - React framework with App Router, server-side rendering, and API routes
- **react (19.2.4)** - Core UI library for building user interfaces
- **react-dom (19.2.4)** - React renderer for web browsers
- **lucide-react (1.14.0)** - Beautiful icon library for UI components

#### Database & Backend
- **@prisma/client (7.8.0)** - Prisma client for database queries and type-safe database access
- **@prisma/adapter-pg (7.8.0)** - PostgreSQL adapter for Prisma (needed for actual database connection)
- **pg (8.20.0)** - PostgreSQL client library (required for database connectivity)
- **dotenv (17.4.2)** - Environment variable management for configuration

#### Authentication & Security
- **next-auth (4.24.14)** - Complete authentication solution for Next.js
- **@next-auth/prisma-adapter (1.0.7)** - Prisma adapter for NextAuth database-backed sessions
- **bcrypt (6.0.0)** - Password hashing library for secure password storage
- **zod (4.4.3)** - Schema validation library for runtime type checking
- **resend (6.12.3)** - Email service for transactional emails (verification, password reset)
- **rate-limiter-flexible** - Rate limiting library for API endpoint protection

### Development Dependencies (Development Only)

#### TypeScript & Type Definitions
- **typescript (^5)** - TypeScript compiler for type-safe JavaScript development
- **@types/node (^20)** - TypeScript definitions for Node.js built-in modules
- **@types/react (^19)** - TypeScript definitions for React
- **@types/react-dom (^19)** - TypeScript definitions for React DOM
- **@types/pg (^8.20.0)** - TypeScript definitions for PostgreSQL client
- **@types/bcrypt (^6.0.0)** - TypeScript definitions for bcrypt

#### Styling & CSS
- **tailwindcss (^4)** - Utility-first CSS framework for rapid UI development
- **@tailwindcss/postcss (^4)** - Tailwind CSS PostCSS plugin for build process

#### Database & Development Tools
- **prisma (^7.8.0)** - Prisma CLI for database migrations, schema management, and client generation
- **tsx (^4.21.0)** - TypeScript executor for running TypeScript files directly
- **@faker-js/faker (^10.4.0)** - Fake data generator for testing and development

#### Code Quality & Linting
- **eslint (^9)** - JavaScript/TypeScript code linting for consistency and error detection
- **eslint-config-next (16.2.4)** - ESLint configuration specifically for Next.js projects

#### Testing
- **jest (^30.4.2)** - JavaScript testing framework for unit and integration tests
- **jest-environment-jsdom (^30.4.1)** - Jest environment for DOM testing
- **@testing-library/react (^16.3.2)** - React testing utilities
- **@testing-library/jest-dom (^6.9.1)** - Custom Jest matchers for DOM elements
- **@testing-library/user-event (^14.6.1)** - User interaction simulation for testing
- **@types/jest (^30.0.0)** - TypeScript definitions for Jest

### Which Dependencies Do You Need?

#### ✅ Essential for This Project
- **next, react, react-dom** - Core framework (cannot be removed)
- **typescript** - Type safety (highly recommended for learning)
- **tailwindcss** - Styling (can be replaced with other CSS solutions)
- **lucide-react** - Icons (can be replaced with other icon libraries)

#### 🔄 Database Dependencies (Choose Your Approach)
- **For JSON File Approach Only**: Can remove `@prisma/client`, `@prisma/adapter-pg`, `pg`, `prisma`
- **For PostgreSQL Approach**: Keep all database-related dependencies
- **Recommended**: Keep them to learn both approaches progressively

#### 🛠️ Development Tools (Optional for Learning)
- **eslint, eslint-config-next** - Code quality (helpful for learning good practices)
- **@faker-js/faker** - Test data (useful for development and testing)
- **tsx** - TypeScript execution (helpful for running scripts)

#### 📦 Type Definitions (Important for TypeScript)
- All `@types/*` packages - Essential for TypeScript development
- Can be removed if switching to JavaScript instead of TypeScript

## 📁 Project Structure

```
first-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   │   ├── [...nextauth]/  # NextAuth configuration
│   │   │   ├── register/       # User registration
│   │   │   ├── verify-email/   # Email verification
│   │   │   └── reset-password/ # Password reset
│   │   ├── user/          # User management endpoints
│   │   │   ├── profile/        # Profile CRUD
│   │   │   └── password/       # Password change
│   │   └── tweets/        # Tweet-related endpoints
│   ├── lib/               # Shared utilities and types
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   ├── verify-email/  # Email verification page
│   │   ├── forgot-password/ # Password reset request
│   │   └── reset-password/ # Password reset completion
│   ├── profile/           # User profile settings
│   ├── tweet/             # Tweet detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── TweetCard.tsx      # Individual tweet component
│   ├── TweetFeed.tsx      # Tweet list component
│   └── LikeButton.tsx     # Interactive like button
├── lib/                   # Shared utilities
│   ├── auth/              # Authentication utilities
│   │   └── password.ts    # Password hashing/validation
│   ├── email/             # Email service
│   │   └── service.ts     # Resend email service
│   └── rate-limit.ts      # Rate limiting utilities
├── prisma/                # Database configuration
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.ts           # Database seeding script
├── public/                # Static assets
├── script/                # Utility scripts
│   ├── add-user.ts       # User management script
│   └── transform-db.ts   # Database transformation script
├── proxy.ts               # Route protection proxy (replaces deprecated middleware)
└── db.json               # Development data storage (normalized structure)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use the provided development setup)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your database configuration
```

3. **Set up the database:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx tsx prisma/seed.ts
```

4. **Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Approach

This project uses a **dual database approach** to help you learn progressively:

### 1. JSON File Database (Currently Active)
- **File**: `db.json` - acts as a simple database
- **Purpose**: Practice data operations without database setup complexity
- **Usage**: Currently used by all API endpoints
- **Benefits**: Easy to understand, no external dependencies, perfect for learning basic CRUD operations
- **Structure**: Normalized JSON matching Prisma schema with separate users, tweets, likes, and dislikes arrays

### 2. PostgreSQL with Prisma (Ready for Future Use)
- **Schema**: `prisma/schema.prisma` - comprehensive database design
- **Purpose**: Production-ready database with proper relationships
- **Features**: User management, tweet relationships, likes/dislikes, follows, retweets
- **Status**: Schema designed and ready, migrations available
- **Benefits**: Real database experience, proper relationships, scalability

### Migration Path
You can start with the JSON file to understand basic concepts, then gradually migrate to the PostgreSQL database as you become more comfortable with database operations.

## 📊 Database Schema

The PostgreSQL schema includes:

### Core Models
- **User**: User profiles with authentication data (password, emailVerified)
- **Account**: OAuth provider accounts (Google, etc.)
- **Session**: Database-backed user sessions
- **VerificationToken**: Email verification and password reset tokens
- **Tweet**: Posts with content, timestamps, and engagement metrics
- **Like/Dislike**: User reactions to tweets
- **Retweet**: Tweet sharing functionality
- **Follow**: User following relationships

### Key Features
- User authentication (email/password and OAuth)
- Email verification and password reset
- Database-backed sessions
- Tweet creation and display
- Like/dislike functionality
- Retweet capability
- Follow/unfollow system
- Real-time engagement metrics

## 🎨 Components Overview

### Header
Displays application header with:
- Application title
- Theme toggle button (light/dark mode)
- WCAG AA-compliant color scheme

### TweetCard
Displays individual tweets with:
- User avatar and information
- Tweet content and timestamp
- Interactive like button
- Clickable link to tweet details
- Theme-aware styling using semantic color tokens

### TweetFeed
Renders a list of tweets:
- Fetches data from API endpoint
- Maps over tweet data
- Handles loading states

### LikeButton
Interactive component for:
- Like/unlike functionality
- Real-time like count updates
- User interaction feedback
- Theme-aware styling

## 🔧 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Registers a new user with email/password authentication.
- Validates input (email, password, name, username)
- Validates password strength
- Checks for existing email/username
- Hashes password using bcrypt
- Sends verification email
- Rate limited: 3 requests per hour per IP

#### POST `/api/auth/verify-email`
Verifies user email using token from verification email.
- Validates token presence and expiration
- Updates user's emailVerified timestamp
- Deletes verification token

#### POST `/api/auth/reset-password/request`
Requests a password reset for a user.
- Validates email presence
- Generates reset token (1-hour expiry)
- Sends password reset email
- Always returns success (prevents email enumeration)
- Rate limited: 3 requests per hour per IP

#### POST `/api/auth/reset-password`
Completes password reset using token.
- Validates token and new password
- Hashes new password
- Updates user password
- Deletes verification token

#### GET `/api/user/profile`
Fetches authenticated user's profile data.
- Requires authentication
- Returns user profile (id, email, name, username, avatar, handle)

#### PATCH `/api/user/profile`
Updates authenticated user's profile.
- Requires authentication
- Accepts name, username, avatar updates
- Checks username uniqueness
- Updates handle when username changes

#### POST `/api/user/password`
Changes authenticated user's password.
- Requires authentication
- Validates current password and new password
- Hashes new password
- Updates user password

### Tweet Endpoints

#### GET `/api/tweets`
Returns all tweets from the JSON database with joined user data and computed reaction counts.

**Response:**
```json
[
  {
    "id": 1,
    "username": "alice121",
    "handle": "@alice121",
    "avatar": "https://i.pravatar.cc/48?u=...",
    "content": "His mother had always taught him\n\nHis mother had always taught him not to ever think of himself as better than others...",
    "timestamp": "2025-01-15T10:30:00.000Z",
    "reactions": {
      "likes": 192,
      "dislikes": 25
    },
    "views": 305,
    "userid": 121
  }
]
```

### GET `/api/tweets/[id]`
Returns a specific tweet by its ID from the JSON database with joined user data and computed reaction counts.

**Parameters:**
- `id` (number): The tweet ID

**Response:**
```json
{
  "id": 1,
  "username": "alice121",
  "handle": "@alice121",
  "avatar": "https://i.pravatar.cc/48?u=...",
  "content": "His mother had always taught him\n\nHis mother had always taught him not to ever think of himself as better than others...",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "reactions": {
    "likes": 192,
    "dislikes": 25
  },
  "views": 305,
  "userid": 121
}
```

**Error Response (404):**
```json
{
  "error": "Tweet not found"
}
```

## 📚 Learning Path

### Beginner Topics
1. **React Components**: Understanding props, state, and component lifecycle
2. **TypeScript Basics**: Type definitions, interfaces, and type safety
3. **CSS with Tailwind**: Utility classes, responsive design, and styling
4. **API Integration**: Fetching data, handling responses, and error management

### Intermediate Topics
1. **Database Design**: Schema creation, relationships, and data modeling
2. **ORM with Prisma**: Database operations, migrations, and seeding
3. **Full-Stack Architecture**: How frontend and backend communicate
4. **State Management**: Component state vs. server state

### Advanced Topics
1. **Authentication**: User login, sessions, and authorization ✅ (Implemented)
2. **Email Verification**: Token-based email verification ✅ (Implemented)
3. **Password Reset**: Secure password reset flow ✅ (Implemented)
4. **OAuth Integration**: Google OAuth provider ✅ (Implemented)
5. **Rate Limiting**: API endpoint protection ✅ (Implemented)
6. **Real-time Features**: WebSockets, live updates
7. **Performance Optimization**: Caching, lazy loading, and code splitting
8. **Deployment**: Production setup and best practices

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Next Steps for Students

1. **Create Tweet Form**: Allow users to post new tweets
2. **User Profiles**: Create individual user pages
3. **Real-time Updates**: Implement live tweet updates
4. **Search Functionality**: Add tweet and user search
5. **Mobile Responsiveness**: Optimize for mobile devices
6. **Testing**: Add unit and integration tests
7. **Deployment**: Deploy to production
8. **Session Cleanup**: Implement cron job for expired session cleanup
9. **Account Cleanup**: Implement cron job for unverified user cleanup

## 🤝 Contributing

This is a teaching project. Feel free to:
- Report issues or bugs
- Suggest improvements
- Add new features
- Improve documentation

---

**Built with ❤️ for ReDI School Web Development Bootcamp**
