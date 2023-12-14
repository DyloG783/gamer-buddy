---
Run dev server:
npm run dev

View prisma dashboard in browser command: 
npx prisma studio

Update Prisma after changing schema: 
1. npx prisma db push (or 'prisma migrate dev' to keep existing data)
2. npx prisma generate

Git:
to merge branch to main
1. push branch
2. checkout master
3. git merge [branch name] 

Run postgres db command:
dont need to run in with app. Use PSQL command tool for console access

PSQL:
view databases; \l
connect to db; \c mydb
    view tables; \dt
    delete all data from table; DELETE FROM your_table_name;
quit psql; \q

Run a script:
with "tsx" (which allow imports into script); npx tsx myscript.ts (while in directory need to figure out tsconfig to run from anywhere)

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
- dgdevelopment65@gmail.com, (new main for managing google logins)
    - dgdevelopment651@gmail.com (Tr...........)

Twitch
- dylangreenslade, (Tr.... Tr....)

postman:
dgdevelopment65@gmail.com

Need help with:

- multiple accounts to test with giving I can't use credentials provider?
- storing only 1 instance of a token in a DB table?
- Text searh only working either with not other selections?
- can't cache all games from db as it's over 2mb. If I create a route to only fetch searched games how would I manage all the possibilities in a db query?
- Good looking css?
- code review main pages?
- 'ButtonAddGame / ButtonRemoveGame' almost identical except for different api routes. Should these be merged?
- userIds in url for routing not good?

---

DB:

- category 1 (console); 3, 4, 5, 6, 8, 9, 11, 12, 13, 14, 20, 34, 39, 48, 49, 130, 165, 167, 169, 384, 385, 386, 390, 471

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
