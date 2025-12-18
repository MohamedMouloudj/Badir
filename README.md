# Badir - Community Initiative Platform

**Badir** is a comprehensive platform designed to connect volunteers and participants with meaningful community initiatives. The platform enables organizations and individuals to create, manage, and participate in social impact projects across various categories.

**Purpose**: Badir aims to build stronger communities by facilitating collaboration between initiative organizers and community members, making it easier to discover, join, and contribute to positive social change initiatives.

## Features

### Core Functionality

- **Initiative Discovery**: Browse and search community initiatives with advanced filtering
- **User Authentication**: Secure login/signup for individuals and organizations
- **Profile Management**: Complete user profiles with location and preferences
- **Initiative Participation**: Join initiatives as helper or participant
- **Organization Management**: Create and manage organizational accounts
- **Rich Content Creation**: TipTap editor with image upload and formatting
- **Multi-language Support**: Arabic (RTL) and English interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Advanced Features

- **Dynamic Participation Forms**: Custom questions per initiative
- **Role-based Access Control**: Admin, Manager, Member roles
- **File/Image Management**: Supabase storage with safe deletion
- **Search & Filters**: Full-text search with category, location, and status filters
- **Pagination**: Efficient cursor-based data loading
- **Rating System**: Platform and initiative ratings
- **Admin Dashboard**: Initiative and organization approval workflow

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework with RTL support
- **Shadcn/UI & Radix UI** - Accessible, composable components

### Backend & Database

- **Prisma ORM** - PostgreSQL schema and migrations
- **Better Auth** - Authentication with JWT sessions
- **Supabase** - File storage with RLS policies

### Form & Content Management

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **TipTap Editor** - Rich text editing
- **DOMPurify** - HTML sanitization

## Architecture Overview

### Folder Structure

```
badir-bunian/
├── actions/ # Server actions for API logic
├── app/ # Next.js App Router pages
│ ├── (auth)/ # Authentication pages
│ ├── admin/ # Admin dashboard
│ ├── api/ # API routes
│ └── initiatives/ # Initiative pages
├── components/ # Reusable UI components
│ ├── layout/ # Footer, Navbar
│ ├── pages/ # Page-specific components
│ └── ui/ # UI primitives (Shadcn)
├── data/ # Static data, routes, statistics
├── hooks/ # Custom React hooks
├── lib/ # Utilities, auth, Supabase client
├── prisma/ # Database schema and migrations
├── schemas/ # Zod validation schemas
├── services/ # Business logic layer
└── types/ # TypeScript definitions
```

### Database Schema

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o| Organization : owns
    User ||--o{ Initiative : "organizes as user"
    User ||--o{ InitiativeParticipant : participates
    User ||--o{ InitiativePost : authors
    User ||--o{ UserInitiativeRating : rates
    User ||--o{ PlatformRating : gives
    User ||--o{ UserQualification : has
    Organization ||--o{ Initiative : "organizes as org"
    Organization ||--o{ SupportRequest : requests
    Initiative ||--o{ InitiativeParticipant : has
    Initiative ||--o{ InitiativePost : has
    Initiative ||--o{ UserInitiativeRating : receives
    Initiative }o--|| InitiativeCategory : "belongs to"
    InitiativePost ||--o{ PostAttachment : has

    User {
        string id PK
        string name
        string image
        string email UK
        boolean emailVerified
        string firstName
        string lastName
        string phone
        date dateOfBirth
        enum sex
        string bio
        enum userType
        decimal latitude
        decimal longitude
        string city
        string state
        string country
        boolean isActive
        datetime createdAt
        datetime updatedAt
        boolean profileCompleted
    }

    Organization {
        string id PK
        string userId "FK, UK"
        string name
        string description
        string logo
        string contactEmail
        string contactPhone
        string website
        string city
        string state
        string country
        datetime createdAt
        datetime updatedAt
        date foundingDate
        string headquarters
        string identificationCard
        int membersCount
        string officialLicense
        string organizationType
        string previousInitiatives
        string shortName
        json socialLinks
        string userRole
        array workAreas
        enum isVerified
    }

    UserQualification {
        string id PK
        string userId FK
        string specification
        string educationalLevel
        string currentJob
        datetime createdAt
        datetime updatedAt
    }

    InitiativeCategory {
        string id PK
        string nameAr
        string nameEn
        string descriptionAr
        string descriptionEn
        string icon
        string bgColor
        string textColor
        boolean isActive
        datetime createdAt
    }

    Initiative {
        string id PK
        enum organizerType
        string organizerUserId FK
        string organizerOrgId FK
        string categoryId FK
        string titleAr
        string titleEn
        string descriptionAr
        string descriptionEn
        string shortDescriptionAr
        string shortDescriptionEn
        string location
        string city
        string state
        string country
        datetime startDate
        datetime endDate
        datetime registrationDeadline
        int maxParticipants
        int currentParticipants
        boolean isOpenParticipation
        enum targetAudience
        json requiredQualifications
        enum status
        string coverImage
        json participationQstForm
        datetime createdAt
        datetime updatedAt
    }

    InitiativeParticipant {
        string id PK
        string initiativeId FK
        string userId FK
        enum participantRole
        json participationForm
        datetime checkInTime
        boolean isCheckedIn
        enum status
        datetime createdAt
        datetime updatedAt
    }

    InitiativePost {
        string id PK
        string initiativeId FK
        string authorId FK
        string title
        string content
        enum postType
        boolean isPinned
        enum status
        datetime createdAt
        datetime updatedAt
    }

    PostAttachment {
        string id PK
        string initiativePostId FK
        string imageUrl UK
        datetime createdAt
        datetime updatedAt
    }

    SupportRequest {
        string id PK
        string organizationId FK
        enum supportType
        string title
        string description
        enum urgency
        enum status
        datetime requestedAt
        datetime updatedAt
        datetime createdAt
    }

    UserInitiativeRating {
        int id PK
        string userId FK
        string initiativeId FK
        decimal rating
        string comment
    }

    PlatformRating {
        string id PK
        string userId FK
        string easeOfUse
        string informationClarity
        string contentDiversity
        string performanceSpeed
        string generalSatisfaction
        array usefulSections
        string encounteredDifficulties
        string difficultiesDetails
        string improvementSuggestions
        string wouldRecommend
        string appRating
        datetime createdAt
        datetime updatedAt
    }

    Session {
        string id PK
        datetime expiresAt
        string token UK
        datetime createdAt
        datetime updatedAt
        string ipAddress
        string userAgent
        string userId FK
    }

    Account {
        string id PK
        string accountId
        string providerId
        string userId FK
        string accessToken
        string refreshToken
        string idToken
        datetime accessTokenExpiresAt
        datetime refreshTokenExpiresAt
        string scope
        string password
        datetime createdAt
        datetime updatedAt
    }

    Verification {
        string id PK
        string identifier
        string value
        datetime expiresAt
        datetime createdAt
        datetime updatedAt
    }
```

### Data Flow

Client Request → Server Function / Next.js API Route → Service Layer → Prisma ORM → PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Supabase account (for file storage)

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/MohamedMouloudj/Badir.git
   cd Badir
```

### Install dependencies

```bash
   npm install
```

### Set up environment variables

```bash
   cp .env.example .env.local
```

```bash
   cp .env.example .env.local
```

### Configure the following in .env.local:

- Database URL (PostgreSQL)
- Better Auth secrets
- Supabase credentials
- Resend API key and email configuration

### Set up database

```bash
   npx prisma migrate dev
   npx prisma db seed
```

### Start development server

```bash
   npm run dev
```

### Open your browser

```bash
   http://localhost:3000
```

## Key Components

### Reusable UI Components

- `FormInput`: Typed input with validation and error mapping
- `AppButton`: Consistent button styles with loading states
- `FilterSelect`: Dynamic filtering for initiatives
- `PostEditor`: TipTap-based rich text editor
- `InitiativeCard`: Initiative display with status badges
- `SearchInput`: Full-text search functionality
- `PaginationControls`: Cursor-based pagination UI
- `Ratings`: Star rating display and input

### Form Components

- `FormFieldCreator`: Dynamic form builder
- `SignupForm`: Multi-step registration flow
- `InitiativeForm`: Initiative creation and editing
- `CompleteProfileForm`: Profile completion workflow

## API Routes

```bash
/api/auth/[...all] # Better Auth handlers
/api/initiatives/ # Initiative CRUD operations
/api/organizations/ # Organization management
/api/participations/ # Participation requests
```

## Server Actions

```bash
actions
│  ├─ admin.ts  # Admin-related actions
│  ├─ helpers.ts    # Helper functions
│  ├─ initiatives.ts    # Initiative-related actions
│  ├─ login.ts  # Login action
│  ├─ logout.ts # Logout action
│  ├─ organization-profile.ts   # Organization profile actions
│  ├─ participation.ts  # Participation-related actions
│  ├─ posts.ts  # Initiative posts actions
│  ├─ signup.ts  # Signup action
│  ├─ submitRating.ts  # Submit rating action
│  └─ user-profile.ts  # User profile actions
```

---

# License

<a href="https://github.com/MohamedMouloudj/Badir">Badir</a>© 2025 by<a href="https://github.com/MohamedMouloudj/">Mohamed Mouloudj</a>and<a href="https://www.linkedin.com/company/bunian-%D8%A8%D9%86%D9%8A%D8%A7%D9%86/">Bunian</a>is licensed under<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</a></br><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">
