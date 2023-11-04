---
Run dev server:
npm run dev

View prisma dashboard in browser command: 
npx prisma studio

Update Prisma after changing schema: 
1. npx prisma db push
2. npx prisma generate

Run postgres db command:
dont need to run in with app. Use PSQL command tool for console access

Need help with:
- setting nav height as %viewport bad idea?
- "any" ts types
- should I use global css at all with tailwind?
- front end validation approach?
- managing async & promises (i.e. games/page.tsx)
- storing only 1 instance of a token in a DB table? (i.e. games/page.tsx)
- paginating api responses. getting into db
- background jobs / workers for things like api auth?

alt accounts:
Google(https://console.cloud.google.com/)
dylantest679@gmail.com, C0mplexPassword!
dgdevelopment65@gmail.com, C0mplexPassword! (new main for managing google logins)

postman:
dgdevelopment65@gmail.com

auth;
POST https://id.twitch.tv/oauth2/token?client_id=t86e9gszh18045kpdlg7r5lv1c9ykq&client_secret=347folsyh0cl57ich7kb6gmloelgh6&grant_type=client_credentials

fetch games;
Headers;
Client-ID - t86e9gszh18045kpdlg7r5lv1c9ykq
Authorization - Bearer <AUTH_TOKEN>
Accept - application/json

POST https://api.igdb.com/v4/games/

Body;
fields name; where game_modes = (2,3,4,5,6); limit 500;
offset 0; sort id;

Cover letter:
https://app.enhancv.com/share/0d57df62/?utm_medium=growth&utm_campaign=share-resume&utm_source=dynamic

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
