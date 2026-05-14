# Vercel Deployment

This repository deploys as one Vercel project:

- Frontend: Vite build from `app/frontend`, served from `app/frontend/dist`
- Backend: Express API exposed through Vercel Functions at `/api`
- Database: hosted PostgreSQL connected through Prisma using `DATABASE_URL`

## Required Vercel Environment Variables

Set these in Vercel Project Settings > Environment Variables:

```text
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
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

For Neon, use these values:

- `DATABASE_URL`: Neon pooled connection string for runtime API requests. The hostname contains `-pooler`.
- `DIRECT_URL`: Neon direct connection string for Prisma migrations. The hostname does not contain `-pooler`.

Both values must be added to the same Vercel environment where you deploy, especially Production. If Vercel has no runtime database variable, or if either value still points to `localhost`, register/login requests can fail with a 500 response.

Recommended Vercel format:

```text
DATABASE_URL=postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://USER:PASSWORD@HOST.REGION.aws.neon.tech/neondb?sslmode=require
```

If Neon includes `channel_binding=require`, remove it in Vercel or let the backend normalize it at runtime. This app only needs `sslmode=require`.

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

That command generates Prisma Client, applies database migrations with `prisma migrate deploy`, and builds the frontend. The migration step uses `DIRECT_URL` when it exists, then falls back to `DATABASE_URL`.

## Neon Checklist

1. Open Neon project dashboard.
2. Click **Connection string**.
3. Copy the pooled connection string into Vercel as `DATABASE_URL`.
4. Copy the direct connection string into Vercel as `DIRECT_URL`.
5. Keep `sslmode=require` in both connection strings.
6. Remove `channel_binding=require` if Neon adds it.
7. Redeploy from the `main` branch.

If the frontend shows `Request failed with status code 500`, open Vercel Deployment > Runtime Logs and look for `Unhandled API error`. The backend logs Prisma error details there while keeping the browser response safe.
