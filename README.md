---

View prisma dashboard in browser command: 
npx prisma studio /

Update Prisma after changing schema: 
1. npx prisma db push (or 'prisma migrate dev' to keep existing data)
2. npx prisma generate

PSQL:
view databases; \l
connect to db; \c mydb
    view tables; \dt
    delete all data from table; DELETE FROM your_table_name;
quit psql; \q

Current script flow: 
1. saveTwitchAuthTokenToDb; fetches auth token from twitch api and saves it to db
2. saveGamesToDb; fetches all multiplayer games and upserts them to db
3. repeat above for 'savemodes...' 'saveGenres...' 'savePlatforms...'
4. reun scripts to create relation connections for the above data

Update npm packages:
1. npx npm-check-updates
2. follow given prompts to update package.json, then npm install to install

alt accounts:
Google(https://console.cloud.google.com/) 
- dylantest679@gmail.com, 
- dgdevelopment65@gmail.com, (Tr.....Development!)
    - dgdevelopment651@gmail.com 

    
Twitch:
- dylangreenslade, (Tr.... Tr....)

postman:
dgdevelopment65@gmail.com

Clerk:
https://dashboard.clerk.com/apps/app_2ZqGHEqwCP0kbHCTu9d9rOAYcrx/instances/ins_2ZqGHBR10qDJFiWuVt7xHbCyXWu

Tunnel to connect clerk with my local - https://localtunnel.github.io/www/ as per - https://clerk.com/docs/users/sync-data
- lt --port 3000

Playwright: 
- Need to have permanent user (per environment?) for authentication created in Clerk first (automation1@gbtest.com)
- automation uses automation_test_data to create games, and other usrs/relations

env per environment:
dotenv -e .env.development -- npx prisma db pull

deploy steps:
Sadly Clerk prod wont work with free vercel domain so I need to share between dev & prod.
- https://dashboard.clerk.com/apps/app_2ZqGHEqwCP0kbHCTu9d9rOAYcrx/instances/ins_2ZqGHBR10qDJFiWuVt7xHbCyXWu/paths
- Switch between http://localhost:3000/ & https://gamer-buddy.vercel.app/
- after deploy update user data to create a webhook update to populate prod db (need seed may work!)

Prisma schema datasource needs switching befor deploy;
// url       = env("DATABASE_URL") // local only
  url       = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connectionf

  Follow vercel cli steps (seems to have got db running)

  

Need help with:


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
