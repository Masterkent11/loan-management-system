# Admin Local Access

The app uses one login page for both users and admins. After login, the frontend redirects based on the authenticated user's role.

## Seeded Admin Account

Run the backend seed script before logging in as admin:

```bash
npm --workspace app/backend run prisma:seed
```

Default admin credentials:

```text
Email: admin@loan.test
Password: Admin123!
```

## Local Run Steps

Start the local database:

```bash
docker compose up -d
```

Apply migrations and seed the admin:

```bash
npm --workspace app/backend run prisma:migrate
npm --workspace app/backend run prisma:seed
```

Start backend and frontend:

```bash
npm run dev:backend
npm run dev:frontend
```

Open the frontend:

```text
http://localhost:5173/login
```

Login using the seeded admin credentials. The frontend redirects admins to:

```text
http://localhost:5173/admin/dashboard
```

## How It Works

The seed script creates a `User` with role `ADMIN`.

Relevant file:

```text
app/backend/prisma/seed.ts
```

The frontend route guard checks the logged-in user's role:

```text
app/frontend/src/routes/protected-route.tsx
```

Admins can:

- view all loan applications
- approve pending loans
- reject pending loans

Regular users can:

- create loan applications
- view only their own loan applications
