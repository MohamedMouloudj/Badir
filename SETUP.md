# Database Setup Guide

## Prerequisites

- Supabase project created
- Database URL configured in `.env`

## Known Migration Issues

Our project has two problematic migrations that will fail on fresh setups due to Supabase/PostgreSQL constraints:

> Update: There is another similar issue with Migration 20250927011553_updated_participation_status. follow same steps as Issue 2 below to fix it.

### Issue 2: Organization Verification Migration

**Migration:** `20250918220621_org_status`
**Problem:** Prisma tries to drop/recreate column causing data loss

### Issue 1: InitiativeStatus Enum Migration

**Migration:** `20250921215634_updated_initiative_status`
**Problem:** Cannot remove enum values directly in PostgreSQL

## Setup Steps

### 1. Clone and Install

```bash
git clone [repository-url]
cd [Badir]
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

# Add your Supabase database URL

3. Database Migration (Manual Fix Required)
   First, try running migrations:

```bash
npx prisma migrate deploy
```

If migrations fail, apply these manual fixes in your Supabase SQL Editor:

Fix 1: Organization Verification

```sql
-- Create the enum if it doesn't exist
CREATE TYPE "public"."OrganizationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- Add temporary column
ALTER TABLE "public"."organizations"
ADD COLUMN "verification_status" "public"."OrganizationStatus" NOT NULL DEFAULT 'pending';

-- Migrate existing data
UPDATE "public"."organizations"
SET "verification_status" =
  CASE
    WHEN "is_verified" = true THEN 'approved'::public."OrganizationStatus"
    ELSE 'pending'::public."OrganizationStatus"
  END;

-- Replace old column
ALTER TABLE "public"."organizations" DROP COLUMN "is_verified";
ALTER TABLE "public"."organizations" RENAME COLUMN "verification_status" TO "is_verified";
```

Fix 2: Initiative Status Enum

```sql
-- Create new enum
CREATE TYPE "public"."InitiativeStatus_new" AS ENUM ('draft', 'published', 'cancelled');

-- Update existing records to map old values
UPDATE "public"."initiatives"
SET "status" =
  CASE
    WHEN "status"::text = 'ongoing' THEN 'published'
    WHEN "status"::text = 'completed' THEN 'published'
    ELSE "status"::text
  END::text::"public"."InitiativeStatus_new";

-- Replace column type
ALTER TABLE "public"."initiatives"
ALTER COLUMN "status" TYPE "public"."InitiativeStatus_new"
USING ("status"::text::"public"."InitiativeStatus_new");

-- Clean up old type
DROP TYPE "public"."InitiativeStatus";
ALTER TYPE "public"."InitiativeStatus_new" RENAME TO "InitiativeStatus";
ALTER TABLE "public"."initiatives" ALTER COLUMN "status" SET DEFAULT 'draft';
```

4. Mark Migrations as Applied
   After running the manual SQL, mark the problematic migrations as resolved:

```bash
npx prisma migrate resolve --applied 20250918220621_org_status
npx prisma migrate resolve --applied 20250921215634_updated_initiative_status

# Run any remaining migrations
npx prisma migrate deploy
```

5. Generate Prisma Client

```bash
npx prisma generate
```

6. Update Row Level Security (RLS)
   IMPORTANT: After running migrations, update your RLS policies in Supabase Dashboard:

Go to Authentication > Policies
Review policies for organizations table
Update any policies that reference the old is_verified boolean to work with the new enum:

```sql
-- Example: Update policy that was checking boolean
-- OLD: is_verified = true
-- NEW: is_verified = 'approved'

-- Example policy update:
ALTER POLICY "Organizations are viewable by everyone" ON organizations
FOR SELECT USING (is_verified = 'approved');
```

Check and update policies for initiatives table if they reference the status field

7. Verify Setup

```bash
# Check database connection
npx prisma db pull

# Verify schema matches
npx prisma validate
```

## Future Contributors

When we migrate to independent PostgreSQL:

We'll create a clean migration history from the current schema
These manual fixes will no longer be necessary
New setup will be: git clone → npm install → npx prisma migrate deploy

## Troubleshooting

**Migration fails**: Check if you've run the manual SQL fixes above
**RLS errors**: Verify policies are updated for new enum values
**Type errors**: Run npx prisma generate after migrations
