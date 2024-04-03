# About

This application is firstly a passion, then secondly a portfolio project called Gamer Buddy. It is currently running in production and can be used by anyone at https://www.gamer-buddy.com/!

Gamer Buddy is built on `NextJs`, `React`, `Postgres` / `Prisma`, integrating with `Pusher` for real time message updates, and `Clerk` auth to manage authentication and authorisation through classic credentials, or common social logins.

The point of Gamer Buddy is for users to connect and be able to chat with other players of games that they have saved to their profile. Once you save a game to your profile you have access to a public game chat forum.

Users can view other player's profiles through the public game chat forum, and request to connect with them privately.

A user will be notified of a connection request, and can accept it to begin talking privately.

This completes the flow of the application. Users can go and play their games on whatever platform is relevant for them, now that they have found eachother!!

# Demo login for an example of the intended experience!

Login as x x to see the user experience with games, connections, requests, etc

## Deployed

The production instance of Gamer Buddy is deployed to Vercel. Pushed to the main branch deploy a new version to Vercel, and post install scipts are run to update the production database instance.

## Testing

### Jest:

_Due to the NextJs's use of new async server components, Jest can't test components in isolation if they are async server rendered. It is mentioned in NextJs's documentation to rely on end-to-end tests for testing these new types of components. Due to this most testing is managed with Playwright in this project._

Run tests with `npm run test`

### Playwright:

End-to-end tests need to use a dummy or mock account which exists in the test/dev instance of Clerk auth. When tests are run in this app temporary seed data is setup, and later torn down, which adds

Run tests with `npx playwright test`

- Need to have permanent user in both dev & production for authentication created in Clerk which is used for authentication and test data to be associated to for end-to-end tests (user: `automation1@gbtestpermanent.com`).
- automation uses `automation_test_users.ts` seed file to create games, and other usrs/relations.

---

# Misc

_Project related information for troubleshooting etc_

### Prisma ORM

- View local prisma dashboard in browser command: `npx prisma studio`.

- Update Prisma types, etc, after changing schema:
  1.  `npx prisma db push` (or `prisma migrate dev` to keep existing data through migrations).
  2.  `npx prisma generate`.

### PSQL commands for psql terminal:

view databases `\l`.
connect to db `\c mydb`.
view tables `\dt`.
delete all data from table `DELETE FROM your_table_name`.
quit psql `\q`.

### Vercel deployment

To keep things simple in this portfolio project, when a new deployment is made to production, the below post install script is run which re-runs all of the scripts required to add games, genres, relations, to the database. This allows the addition of games by loosening restrictions in the scripts which pull games, etc from the IGDB API. This means that prisma migrations are not used.

scripts:
_this script found in package.json is run in the production instance on each proudction deployment_
`"postinstall": "prisma db push && prisma generate && prisma db seed && next build && npm run allGameData"`

### if dotenv is used

env per environment example: `dotenv -e .env.development -- npx prisma db pull`
