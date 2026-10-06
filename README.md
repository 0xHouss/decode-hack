# Decode Hack

Website and registration form for **Decode Hack**, a hackathon organised by USTHB INFO ING-1 S-D.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and Prisma 7 on PostgreSQL. Registrations are saved to the database and posted to a Discord channel through a webhook.

## Requirements

- Node.js 24 or newer
- pnpm 12
- A PostgreSQL database

## Setup

1. Install dependencies. This also generates the Prisma client.

   ```bash
   pnpm install
   ```

2. Create a `.env` file at the project root:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/decode_hack"
   DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
   ```

   | Variable | Used by | Purpose |
   | --- | --- | --- |
   | `DATABASE_URL` | App, Prisma CLI, export script | PostgreSQL connection string |
   | `DISCORD_WEBHOOK_URL` | Registration form | Webhook that receives a message for each new registration |

3. Create the database tables from the schema:

   ```bash
   pnpm exec prisma db push
   ```

4. Start the dev server and open [http://localhost:3000](http://localhost:3000):

   ```bash
   pnpm dev
   ```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm export` | Export all registrations to `export.csv` |

## Database

- The schema lives in `prisma/schema.prisma`, with a single `Submission` model.
- The connection URL is configured in `prisma.config.ts`, which reads `DATABASE_URL` from `.env`.
- The app connects through the `@prisma/adapter-pg` driver adapter (`src/lib/prisma.ts`).
- The project has no migration history. Apply schema changes with `pnpm exec prisma db push`.

## Exporting registrations

```bash
pnpm export
```

This reads every submission from the database specified by `DATABASE_URL`, oldest first, and writes them to `export.csv` at the project root. The file contains participants' personal data and is ignored by git; don't commit or share it publicly.

## Opening and closing registrations

- The countdown deadline is `registrationEndDate` in `src/lib/config.ts`.
- Registrations are currently closed: `submitRegistrationForm` in `src/lib/actions.ts` always returns a "registration is closed" error. The working implementation is kept as `submitRegistrationFormOld`. To reopen, restore it as `submitRegistrationForm`.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs `pnpm lint` and `pnpm build` on every push to `main` and on every pull request.
