# Vercel Deployment

This repository deploys as one Vercel project:

- Frontend: Vite build from `app/frontend`, served from `app/frontend/dist`
- Backend: Express API exposed through Vercel Functions at `/api`
- Database: hosted PostgreSQL connected through Prisma using `DATABASE_URL`

## Required Vercel Environment Variables

Set these in Vercel Project Settings > Environment Variables:

```text
DATABASE_URL=postgresql://...
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=https://your-vercel-domain.vercel.app
```

`VITE_API_BASE_URL` is optional. In production, the frontend defaults to `/api`.

For Vercel, `DATABASE_URL` must be the hosted PostgreSQL URL from Neon, Prisma Postgres, Supabase, or another provider. Do not use:

```text
postgresql://loan_user:loan_password@localhost:5432/loan_management
```

`localhost` only works on your computer. Vercel cannot reach your local Docker database.

## Database Setup

Use a hosted PostgreSQL database. Good options:

- Prisma Postgres from the Vercel Marketplace
- Neon
- Supabase
- Railway PostgreSQL

The local Docker database is only for local development and will not exist on Vercel.

## Vercel Project Settings

Import the GitHub repository once as a single Vercel project.

Recommended settings:

```text
Framework Preset: Other
Root Directory: ./
Install Command: npm install
Build Command: npm run vercel-build
Output Directory: app/frontend/dist
```

The root `vercel.json` already defines these runtime routes:

```text
/api/*  -> Express backend
/health -> Express backend
/*      -> React app fallback
```

## Deploy Flow

1. Push the deployment code to `main`.
2. Import the repository into Vercel.
3. Set Vercel's production branch to `main`.
4. Add the environment variables for Production, Preview, and Development, or choose all environments.
5. Deploy.

During build, Vercel runs:

```bash
npm run vercel-build
```

That command generates Prisma Client, applies database migrations with `prisma migrate deploy`, and builds the frontend.
