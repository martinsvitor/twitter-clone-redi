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

### Development Dependencies (Development Only)

#### TypeScript & Type Definitions
- **typescript (^5)** - TypeScript compiler for type-safe JavaScript development
- **@types/node (^20)** - TypeScript definitions for Node.js built-in modules
- **@types/react (^19)** - TypeScript definitions for React
- **@types/react-dom (^19)** - TypeScript definitions for React DOM
- **@types/pg (^8.20.0)** - TypeScript definitions for PostgreSQL client

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
│   │   └── tweets/        # Tweet-related endpoints
│   ├── lib/               # Shared utilities and types
│   ├── tweet/             # Tweet detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── TweetCard.tsx      # Individual tweet component
│   ├── TweetFeed.tsx      # Tweet list component
│   └── LikeButton.tsx     # Interactive like button
├── prisma/                # Database configuration
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.ts           # Database seeding script
├── public/                # Static assets
├── script/                # Utility scripts
│   ├── add-user.ts       # User management script
│   └── transform-db.ts   # Database transformation script
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
- **User**: User profiles with authentication data
- **Tweet**: Posts with content, timestamps, and engagement metrics
- **Like/Dislike**: User reactions to tweets
- **Retweet**: Tweet sharing functionality
- **Follow**: User following relationships

### Key Features
- User authentication and profiles
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

### GET `/api/tweets`
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
1. **Authentication**: User login, sessions, and authorization
2. **Real-time Features**: WebSockets, live updates
3. **Performance Optimization**: Caching, lazy loading, and code splitting
4. **Deployment**: Production setup and best practices

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Next Steps for Students

1. **Add User Authentication**: Implement login/logout functionality
2. **Create Tweet Form**: Allow users to post new tweets
3. **User Profiles**: Create individual user pages
4. **Real-time Updates**: Implement live tweet updates
5. **Search Functionality**: Add tweet and user search
6. **Mobile Responsiveness**: Optimize for mobile devices
7. **Testing**: Add unit and integration tests
8. **Deployment**: Deploy to production

## 🤝 Contributing

This is a teaching project. Feel free to:
- Report issues or bugs
- Suggest improvements
- Add new features
- Improve documentation

---

**Built with ❤️ for ReDI School Web Development Bootcamp**
