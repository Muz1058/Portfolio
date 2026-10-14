# Muzaffar Ali - Portfolio

Personal developer portfolio for Muzaffar Ali, a Full Stack Developer (.NET & Angular) and Software Engineering student at University of Central Punjab, Lahore.
Built dynamically using Next.js 16 and Tailwind CSS with Framer Motion. Data driven sections for projects, skills, and experience.

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Configuration

- **/data**: Houses dynamic datasets (`projects.js`, `skills.js`, etc.) so the UI easily scales without modifying components.
- **/components**: Houses separated UI sections adhering to glassmorphism styles globally typed via Tailwind V4.

## Portfolio Dashboard

Run the app and open `/dashboard` to manage projects, experience, skills, certifications, services, and site copy. The dashboard can save a draft in the current browser or export a complete `content.json` file.

First commit and deploy the dashboard code. To enable publishing locally, copy `.env.example` to `.env.local` and set `DASHBOARD_PASSWORD` and `GITHUB_TOKEN`. Create a fine-grained GitHub token limited to this repository with **Contents: Read and write** permission. Keep the token server-side; do not prefix it with `NEXT_PUBLIC_`. Set the same two secrets in your hosting provider so the deployed dashboard can publish too.

After signing in at `/dashboard`, click **Push to GitHub** to create a commit updating `portfolio/data/content.json` on `GITHUB_BRANCH` (defaults to `main`). GitHub can then trigger the site deployment. The explicit push step lets you finish and review an entry before it goes live. Export JSON remains available as a manual fallback. Set `GITHUB_REPOSITORY` and `GITHUB_BRANCH` in `.env.local` if you want to publish somewhere other than `Muz1058/Portfolio` on `main`.

## Deployment

Recommended to be deployed instantly on [Vercel](https://vercel.com/new).
