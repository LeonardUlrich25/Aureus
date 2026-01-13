This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Model integration (Anthropic / Claude Haiku 4.5)

This project includes a small example server route that will proxy requests to an Anthropic model. To use a model such as `claude-haiku-4.5` you must:

1. Obtain access to the model from Anthropic (see `admin_instructions.md`).
2. Set the required environment variables in your deployment or local `.env.local`:

```env
ANTHROPIC_API_KEY=sk-...        # keep secret, server-side only
CLAUDE_MODEL=claude-haiku-4.5  # model id the server will use
```

3. The server proxy endpoint is available at `POST /api/generate` and expects a JSON body `{ "prompt": "...", "max_tokens": 300 }`.

4. The server route will forward the request to the Anthropic API using `process.env.CLAUDE_MODEL`.

Notes:
- Do not store API keys in client-side code or in public repositories.
- If Anthropic uses a different header or endpoint for your account, update `app/api/generate/route.ts` to match the provider instructions.

See `admin_instructions.md` for a template support message and extra details.
