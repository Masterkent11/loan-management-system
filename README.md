# Loan Management System

Full-stack loan management system scaffolded for the senior developer coding exam.

## Stack

- Frontend: React, TypeScript, Vite, React Router, React Query, Zustand, React Hook Form, Zod
- Backend: Node.js, TypeScript, Express, Prisma, PostgreSQL, JWT, bcrypt
- Shared package: centralized constants, types, and loan repayment calculator
- DevOps: Docker Compose, Dockerfiles, GitHub Actions quality gates

## Structure

```text
app/
  backend/
    src/
      config/ controllers/ database/ middlewares/ routes/ services/
      validators/ utils/ constants/ types/
  frontend/
    src/
      components/ constants/ features/ hooks/ lib/ routes/ services/
      store/ styles/ types/ utils/
packages/
  shared/
    src/
      constants/ types/ utils/
```

## Local Setup

```bash
npm install
docker compose up -d
npm --workspace app/backend run prisma:migrate
npm --workspace app/backend run prisma:seed
npm run dev:backend
npm run dev:frontend
```

Default seeded admin:

- Email: `admin@loan.test`
- Password: `Admin123!`

Admin dashboard URL:

- Local: `http://localhost:5173/admin/dashboard`
- Login page: `http://localhost:5173/login`

More details: [Admin Local Access](docs/development/admin-access.md)

## Deployment Notes

Deploy Vercel from the `main` branch. For Neon, set both database variables in Vercel:

- `DATABASE_URL`: pooled Neon connection string for API runtime
- `DIRECT_URL`: direct Neon connection string for Prisma migrations

Keep `sslmode=require` in both URLs, and remove `channel_binding=require` from the Vercel values if Neon adds it. More details: [Vercel Deployment](docs/deployment/vercel.md)

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/loans`
- `GET /api/loans/my-loans`
- `GET /api/loans/admin/all`
- `PATCH /api/loans/admin/:loanId/approve`
- `PATCH /api/loans/admin/:loanId/reject`
