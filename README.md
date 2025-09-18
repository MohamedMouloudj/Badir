# Badir - Community Initiative Platform

**Badir** is a comprehensive platform designed to connect volunteers and participants with meaningful community initiatives. The platform enables organizations and individuals to create, manage, and participate in social impact projects across various categories.

**Purpose**: Badir aims to build stronger communities by facilitating collaboration between initiative organizers and community members, making it easier to discover, join, and contribute to positive social change initiatives.

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/UI** - Component library built on Radix UI
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Database

- **PostgreSQL** - Primary database
- **Prisma ORM** - Database toolkit and query builder
- **Better Auth** - Authentication system
- **Next.js API Routes** - Server-side API endpoints

### UI/UX

- **GSAP** - Advanced animations
- **Embla Carousel** - Touch-friendly carousels
- **React Fast Marquee** - Scrolling animations
- **React Responsive** - Responsive design utilities

### Development Tools

- **ESLint** - Code linting
- **Prisma Studio** - Database management
- **TSX** - TypeScript execution
- **Turbopack** - Fast bundler (Next.js)

## Architecture

### Project Structure

```
badir-bunian-hackathon/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── api/                      # API endpoints
│   ├── initiatives/              # Initiatives pages
│   └── about/                    # Static pages
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components (Shadcn)
│   ├── pages/                    # Page-specific components
│   └── layout/                   # Layout components
├── lib/                          # Utilities and configurations
│   ├── auth.ts                   # Authentication config
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # Helper functions
├── services/                     # Business logic layer
│   ├── initiatives.ts            # Initiative CRUD operations
│   └── categories.ts             # Category management
├── schemas/                      # Zod validation schemas
├── types/                        # TypeScript type definitions
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding
└── public/                       # Static assets
```

### Database Architecture

```
Users ←→ Initiatives (Many-to-Many via Participations)
  ↓
Organizations ←→ Users (Many-to-Many via Memberships)
  ↓
Categories ←→ Initiatives (One-to-Many)
  ↓
Certificates ← Participations (One-to-One)
```

### Key Features Architecture (Implemented ones)

#### Authentication System

- **Better Auth** integration with Prisma adapter
- Support for both individual users and organizations
- JWT-based session management
- Role-based access control (Admin, Manager, Member)

#### Initiative Management

- **CRUD Operations**: Create, read, update, delete initiatives
- **Advanced Filtering**: By category, status, location, organizer type
- **Search Functionality**: Full-text search across initiatives
- **Pagination**: Efficient data loading with cursor-based pagination

#### User Management

- **Dual User Types**: Helpers (volunteers) and Participants (beneficiaries)
- **Profile Completion**: Step-by-step profile setup
- **Geolocation Support**: Location-based initiative discovery

#### Organization System (In development)

- **Multi-role Organizations**: Admin, Manager, Member roles
- **Organization Initiatives**: Organizations can create and manage initiatives
- **Membership Management**: Invite and manage organization members

#### UI/UX Design

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **RTL Support**: Arabic language support with right-to-left layout
- **Accessibility**: WCAG compliant components from Radix UI
- **Dark Mode**: Theme switching support

### API Architecture

```
/api/initiatives/     # Initiative CRUD operations
├── GET /             # List initiatives with filters
├── POST /            # Create new initiative
├── GET /[id]         # Get initiative details
├── PUT /[id]         # Update initiative
└── DELETE /[id]      # Delete initiative

/api/auth/            # Authentication endpoints
└── [...all]/         # Better Auth handlers
```

### Data Flow

1. **Client Request** → Next.js API Route
2. **API Route** → Service Layer (Business Logic)
3. **Service Layer** → Prisma ORM
4. **Prisma** → PostgreSQL Database
5. **Response** → Client via JSON

### State Management

- **React State**: Local component state with useState/useReducer
- **Server State**: API data fetching with native fetch
- **Form State**: React Hook Form for complex forms
- **Theme State**: Next Themes for dark/light mode

## Core Functionalities

- **Initiative Discovery**: Browse and search community initiatives
- **User Authentication**: Secure login/signup for individuals and organizations
- **Profile Management**: Complete user profiles with location and preferences
- **Initiative Participation**: Join initiatives as helper or participant
- **Organization Management**: Create and manage organizational accounts
- **Certificate Generation**: Issue participation certificates
- **Multi-language Support**: Arabic and English interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Setup Instructions

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Copy `.env.example` to `.env.local`
4. **Set up database**: Run `npx prisma migrate dev`
5. **Seed database**: Run `npx prisma db seed`
6. **Start development server**: `npm run dev`

---
<a href="https://github.com/MohamedMouloudj/Badir">Badir</a> © 2025 by <a href="https://github.com/MohamedMouloudj/">Mohamed Mouloudj</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</a></br><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">
