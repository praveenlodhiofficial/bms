# @repo/db - Database Package

This package contains the Prisma database configuration and schema for the BMS (Book Management System) monorepo.

## Overview

This package is designed to be shared across all applications in the monorepo that need database access. It provides:
- Prisma schema definition
- Database client generation
- Type-safe database operations

## Setup Instructions

### 1. Initialize the Package

```bash
# Navigate to the prisma package directory
cd packages/prisma

# Initialize the package (if not already done)
npm init -y
```

### 2. Configure Package.json

Update the `package.json` to reflect the monorepo structure:

```json
{
  "name": "@repo/db",
  "version": "1.0.0",
  "description": "Database package for BMS monorepo",
  "main": "index.js",
  "types": "index.d.ts",
  "keywords": ["database", "prisma", "bms"],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "typescript": "^5.0.0"
  },
  "dependencies": {
    "prisma": "^6.13.0",
    "@prisma/client": "^6.13.0"
  },
  "scripts": {
    "generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx seed.ts"
  }
}
```

### 3. TypeScript Configuration

The `tsconfig.json` extends the shared TypeScript configuration:

```bash
# Initialize the package with typescript
npx tsc --init
```

###  Extend the tsconfig.json from @repo/typescript-config/base.json

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*", "prisma/**/*"],
  "exclude": ["node_modules", "dist", "generated"]
}
```

### 4. Prisma Setup

Install Prisma and initialize:

```bash
# Install Prisma
pnpm add prisma @prisma/client

# Initialize Prisma (if not already done)
npx prisma init
```

### 5. Environment Configuration

Create a `.env` file in the prisma package directory:

```env
# Database URL for PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/bms_db"
```

### 6. Database Schema

The Prisma schema is located at `prisma/schema.prisma`. Key configurations:

- **Client Output**: Generated client is placed in `../generated/prisma` for better monorepo organization
- **Database Provider**: PostgreSQL
- **Models**: Currently includes User model with UUID primary key

### 7. Migrate and Generate Database Client

```bash
# Migrate the database
npx prisma migrate dev

# Generate Prisma client
pnpm generate
```

### 8. Database Operations

```bash
# Push schema changes to database
pnpm db:push

# Create and apply migrations
pnpm db:migrate

# Open Prisma Studio for database management
pnpm db:studio
```

## Usage in Other Packages

### Importing the Database Client

In other packages/apps, install the database package:

```bash
# In apps/web or apps/http-server
pnpm add @repo/db
```

### Using the Client

```typescript
import { PrismaClient } from '@repo/db/generated/prisma'

const prisma = new PrismaClient()

// Use the client
const users = await prisma.user.findMany()
```

## Development Workflow

1. **Schema Changes**: Modify `prisma/schema.prisma`
2. **Generate Client**: Run `pnpm generate` to update the client
3. **Push Changes**: Use `pnpm db:push` for development or `pnpm db:migrate` for production
4. **Update Dependencies**: Other packages will automatically get the updated client

## File Structure

```
packages/prisma/
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
├── prisma/
│   └── schema.prisma     # Database schema
├── generated/            # Generated Prisma client (gitignored)
├── src/                  # Additional database utilities
└── README.md            # This file
```

## Notes

- The generated Prisma client is placed in `../generated/prisma` to keep it outside the package directory
- Environment variables should be configured in each app that uses the database
- The package uses workspace dependencies for TypeScript configuration
- Database migrations are managed through Prisma's migration system