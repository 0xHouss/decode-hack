# Decode Hack

Website and registration form for **Decode Hack**, a hackathon organised by USTHB INFO ING-1 S-D.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and Prisma 7 on PostgreSQL. Registrations are saved to the database and posted to a Discord channel through a webhook.

The 2025 edition ran from 31 July to 3 August 2025, and the site is now an archive of it. The registration form is still online at `/register/personal`, but registration is closed, so the last step reports that instead of saving.

![Home page](docs/screenshots/home.jpg)

![First registration step, showing validation errors](docs/screenshots/registration.jpg)

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
| `pnpm test` | Run the unit tests with Vitest |
| `pnpm export` | Export all registrations to `export.csv` |

## How registration works

The form is split into four steps, each its own page: `/register/personal`, `academic`, `hackathon` and `extra`.

- **Validation:** `src/lib/schemas.ts` defines every field's rules with Zod. Each step validates its own slice of them, listed in `src/lib/registration-steps.ts`. A rule that spans two fields, requiring experience details when the answer is "yes", is added to both the hackathon step and the full schema.
- **Saved answers:** `src/lib/store.ts` keeps the answers in a Zustand store saved to localStorage, so reloading or going back to a step doesn't lose them.
- **Steps:** each step's form comes from `useRegistrationStep` in `src/hooks/use-registration-step.tsx`. It fills the form from the saved answers, sends the user back to the first earlier step that doesn't pass its rules, saves the answers on submit and moves on to the next step. The Back links save the current answers without validating them.
- **Submitting:** the last step calls the `submitRegistrationForm` server action in `src/lib/actions.ts`. It rejects submissions after `registrationEndDate`, validates everything again on the server, saves the registration with Prisma and then posts it to Discord. A failed Discord notification is only logged, because the registration is already saved and an error would make the user submit twice.

The rules and date handling are covered by unit tests in `src/lib/*.test.ts`.

## Styling

The brand palette is defined once at the top of `src/app/globals.css` (`leaf`, `cream`, `night-900`…) and used through Tailwind classes such as `bg-leaf` or `text-cream/50`. The same file defines the gradients used across the site as utilities, like `heading-gradient` and `field-frame`, along with the entrance and scroll-reveal animations.

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

Registration closes at `registrationEndDate` in `src/lib/config.ts`. The same date drives the countdown and the server action, which rejects submissions once it has passed. To reopen registration, move the date into the future.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs `pnpm lint`, `pnpm test` and `pnpm build` on every push to `main` and on every pull request.
