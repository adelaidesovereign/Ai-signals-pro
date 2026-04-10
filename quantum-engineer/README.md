# The Quantum Engineer — Adelaide Taylor's Platform

A Next.js 14 full-stack application powering ShesAdelaide.com. The public marketing site, the quiz, the authentication system, Stripe checkout, the Field Guide reader, the Certification Program player, the Inner Circle membership, and the private member dashboard all live inside a single deploy.

This README is the setup document Adelaide (or a developer working with her) needs to take this from a clean machine to a production deploy.

---

## What is in this repository

```
quantum-engineer/
├── prisma/schema.prisma        Postgres schema (Prisma ORM)
├── src/
│   ├── app/
│   │   ├── (marketing)/        Homepage, About, Services, Quiz
│   │   ├── (auth)/             Login, Register, Reset
│   │   ├── api/                Auth, Stripe, ConvertKit, quiz, progress,
│   │   │                       notes, journal, community API routes
│   │   ├── dashboard/          Private member dashboard + journal + account
│   │   ├── field-guide/        Field Guide index and per-chapter reader
│   │   ├── certification/      Certification Program index + lesson player
│   │   ├── inner-circle/       Membership shell: drops, calls, feed, library
│   │   ├── welcome/            Post-checkout account setup
│   │   └── layout.tsx          Root layout + fonts + session provider
│   ├── auth.ts                 NextAuth v5 config with credentials provider
│   ├── middleware.ts           Protected route enforcement
│   ├── components/             UI primitives + course renderers + site shell
│   ├── content/                Course content (Field Guide + Certification)
│   │                           and quiz questions, written as TypeScript
│   └── lib/                    prisma, stripe, convertkit, cn helpers
├── sequences.md                Three ConvertKit email sequences, ready to paste
├── .env.example                Every environment variable the app requires
├── vercel.json                 Vercel deploy config with security headers
├── tailwind.config.ts          Sage / cream / gold design system
└── package.json
```

---

## Requirements

- Node.js 20 or 22
- PostgreSQL 14+ (local for development, Vercel Postgres or Neon for production)
- A Stripe account
- A ConvertKit account (Creator or Creator Pro — v4 API access)
- A Vercel account for deployment

---

## Local development — quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill it in
cp .env.example .env.local
# Also copy to .env so the Prisma CLI can read it
cp .env.local .env

# 3. Generate the Prisma client and push the schema to your local Postgres
npx prisma generate
npx prisma db push

# 4. Start the dev server
npm run dev
```

The site is now at `http://localhost:3000`.

For Stripe webhooks during local development, in a second terminal:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the whsec_... value it prints and paste it into STRIPE_WEBHOOK_SECRET in .env.local
```

---

## Environment variables

Every key is documented in `.env.example`. The short version:

### Database
- `DATABASE_URL` — pooled connection string (used by the running app)
- `DIRECT_URL` — direct (non-pooled) connection string (used by `prisma migrate`)

### NextAuth
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` locally, `https://shesadelaide.com` in production

### Stripe
- `STRIPE_SECRET_KEY` — server-side secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — client-side publishable
- `STRIPE_WEBHOOK_SECRET` — from `stripe listen` locally, from the dashboard in production
- `STRIPE_PRICE_FIELD_GUIDE` — price id for the $27 Field Guide
- `STRIPE_PRICE_CERTIFICATION_FULL` — price id for the $497 one-time Certification
- `STRIPE_PRICE_CERTIFICATION_INSTALLMENT` — price id for the 3 × $167 payment plan
- `STRIPE_PRICE_INNER_CIRCLE` — price id for the $97/month Inner Circle

To create the Stripe prices:

1. In the Stripe dashboard, go to **Products → Add product**.
2. Create four products: Field Guide, Certification Program (full), Certification Program (payment plan), Inner Circle.
3. For Field Guide: one-time price, $27 USD.
4. For Certification full: one-time price, $497 USD.
5. For Certification plan: recurring subscription, $167 USD monthly, **3 payments then cancel** — configure through Stripe's subscription schedules or billing settings.
6. For Inner Circle: recurring subscription, $97 USD monthly.
7. Copy each resulting `price_...` id into the corresponding env var.

### ConvertKit (v4 API)
- `CONVERTKIT_API_KEY` — from **Account → API**
- `CONVERTKIT_API_SECRET` — optional, not currently required by this codebase
- `CONVERTKIT_FORM_QUIZ` — the form id to subscribe quiz takers to
- `CONVERTKIT_FORM_FOOTER` — the form id for the footer newsletter capture
- `CONVERTKIT_TAG_FIELD_GUIDE_BUYER` — applied on paid checkout of the Field Guide
- `CONVERTKIT_TAG_CERTIFICATION_BUYER` — applied on paid checkout of the Certification
- `CONVERTKIT_TAG_INNER_CIRCLE_MEMBER` — applied on active Inner Circle subscription
- `CONVERTKIT_TAG_QUIZ_LAYER_1` through `CONVERTKIT_TAG_QUIZ_LAYER_7` — one tag per layer result

Every ConvertKit call fails soft. If ConvertKit is down or a key is missing, the purchase, signup, or quiz submission still completes. The ConvertKit error is logged server-side and the user never sees it.

### Vercel Blob (optional)
- `BLOB_READ_WRITE_TOKEN` — only needed once Adelaide starts uploading subliminal audio files through the platform. Safe to leave blank until then.

---

## Production deploy — Vercel

1. Push this repository to GitHub (already done on branch `claude/quantum-engineer-platform-7gNeP`).
2. In Vercel, click **New Project** and import the repository.
3. Set the **root directory** to `quantum-engineer` (this app lives inside a subdirectory of the main repo).
4. In **Build & Development Settings**, the framework preset is `Next.js` and the build command is `prisma generate && next build` (Vercel picks this up from `vercel.json`).
5. Open **Settings → Environment Variables** and paste every key from your `.env.local` into Production. Keep them in Preview too if you want branch deploys to work against a Preview database.
6. Create a **Vercel Postgres** database from **Storage → Create Database**, or use an external provider like Neon or Supabase. Either way, set `DATABASE_URL` and `DIRECT_URL` from the resulting connection strings.
7. Deploy.
8. Run `npx prisma db push` against the production database **once**, from your local machine, with `DATABASE_URL` set to the production connection string, to apply the schema.

### Stripe webhook in production

1. In the Stripe dashboard, go to **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://shesadelaide.com/api/stripe/webhook`
3. Events to send: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.
4. Copy the signing secret (`whsec_...`) and paste it into the Vercel env var `STRIPE_WEBHOOK_SECRET`. Redeploy.

### Connecting ShesAdelaide.com (Google Domains)

1. In the Vercel project, open **Settings → Domains → Add**. Enter `shesadelaide.com`.
2. Vercel will show you the DNS records to create. There are two common options — use the **A record** flow:
   - `@` (apex) → `A` → `76.76.21.21`
   - `www` → `CNAME` → `cname.vercel-dns.com`
3. In Google Domains (now Squarespace Domains), open **DNS** for shesadelaide.com and add the records exactly as Vercel displayed them. Delete any stale A or CNAME records pointing at the old host.
4. Wait for DNS to propagate — usually a few minutes, sometimes up to an hour.
5. Vercel will automatically issue an SSL certificate once the records resolve.
6. Set the primary domain to `shesadelaide.com` (without `www`) in Vercel Domain settings so all traffic canonicalizes to one version.

---

## What the app does on purchase

1. A buyer clicks a checkout link on the Services page — e.g. `/api/stripe/checkout?product=field-guide`.
2. That route creates a Stripe Checkout Session and redirects to Stripe-hosted checkout.
3. After payment, Stripe redirects back to `/welcome?session_id=...&product=...`.
4. The webhook (`/api/stripe/webhook`) receives `checkout.session.completed`, looks up the user by email, creates a placeholder User row if they do not yet exist, records the Purchase or Subscription, and applies the ConvertKit buyer tag.
5. The `/welcome` page reads the buyer's email from the Stripe session and presents the username + password setup form. Once submitted, the placeholder User is updated and they are signed in automatically.
6. They are redirected into the product they bought (`/field-guide`, `/certification`, or `/inner-circle`) and the dashboard now reflects their new access.

No product is readable without a paid Purchase or active Subscription — every protected page checks the database on every request. The middleware also blocks unauthenticated users from even reaching the protected routes.

---

## Content editing

All course content is in `src/content/`:

- `src/content/courses/field-guide/` — one file per chapter, 15 files total
- `src/content/courses/certification/module-1.ts` through `module-6.ts` — one file per module, each with three lessons
- `src/content/inner-circle.ts` — monthly drops, upcoming calls, and subliminals library
- `src/content/quiz.ts` — quiz questions, scoring weights, and the layer result copy

Edit the files in git, commit, and Vercel redeploys automatically. No CMS is required. Adelaide owns the content end-to-end.

Each lesson is a typed `CourseLesson` built from small content blocks — paragraphs, headings, lists, block quotes, video placeholders with scripts beneath, and soft "pause" notes. Add new block types to `src/content/courses/types.ts` and `src/components/courses/CourseBlocks.tsx` together.

---

## Phase 2 — future additions

The folder structure is built to accept the next wave of work without restructuring:

- **Sacred Sovereign Subliminals app.** When the audio library is ready, drop the files into Vercel Blob, extend the `Subliminal` type in `src/content/inner-circle.ts`, and add a player component to the Inner Circle page. No other changes required.
- **Mastermind application flow.** A new protected page under `/mastermind` with its own form route under `/api/mastermind`, writing to a new Prisma model. The pattern is the same as the quiz submit.
- **Expanded Inner Circle features.** Live call recordings can attach to the `LiveCall` type. The `CommunityPost` and `CommunityComment` tables already support threading and can grow into likes, categories, and moderation without schema changes to the user model.

---

## Running tests

This build prioritises shipping the production system first. There are no automated tests in this commit. The recommended first test to add is an integration test of the Stripe webhook path using the Stripe CLI's `trigger` command — it is the route with the most branching and the highest cost of failure.

---

## The voice

Every piece of copy in this codebase was written to sound like Adelaide Taylor wrote it. No filler. No banned phrases. No AI language. If you edit copy in this project, read it out loud before committing. If it sounds like marketing, rewrite it. If it sounds like a real person who knows what she is talking about, it is correct.

The banned words list that every PR should be checked against:

> elevate, seamlessly, game changer, dive into, unlock, delve, effortlessly, it's worth noting, journey, transform your life, empower, leverage, navigate, groundbreaking, revolutionary, cutting-edge

Every sentence starts with a capital letter. Proper punctuation throughout. Short sentences beat long ones. Warm but not soft. Precise but not clinical. That is the rule.
