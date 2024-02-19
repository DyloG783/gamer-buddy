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
2. (update all) follow given prompts to update package.json, then npm install to install
   - (update single) npm update [package] i.e. npm update @testing-library/jest-dom

Jest:

Run tests with; npm run test

Playwright:

Run tests with; npx playwright test

- Need to have permanent user (per environment?) for authentication created in Clerk first (automation1@gbtest.com)
- automation uses automation_test_data to create games, and other usrs/relations

env per environment:
dotenv -e .env.development -- npx prisma db pull

Vercel deployment scripts:
"postinstall": "prisma db push && prisma generate && prisma db seed && next build && npm run allGameData"
