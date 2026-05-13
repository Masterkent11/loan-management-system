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

1. Push the deployment branch to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables.
4. Deploy.

During build, Vercel runs:

```bash
npm run vercel-build
```

That command generates Prisma Client, applies database migrations with `prisma migrate deploy`, and builds the frontend.
