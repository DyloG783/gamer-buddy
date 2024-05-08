# About

This application is a passion, portfolio project called Gamer Buddy. It is currently running in production and can be used by anyone at https://www.gamer-buddy.com/!

Gamer Buddy is built on `NextJs`, `React`, `Postgres` / `Prisma`, integrating with `Pusher` for real time message updates, and `Clerk` auth to manage authentication and authorisation through classic credentials, or common social logins.

The point of Gamer Buddy is for users to connect and be able to chat with other players of games that they have saved to their profile. Once you save a game to your profile you have access to a public game chat forum.

Users can view other player's profiles through the public game chat forum, and request to connect with them privately.

A user will be notified of a connection request, and can accept it to begin talking privately.

This completes the flow of the application. Users can go and play their games on whatever platform is relevant for them, now that they have found eachother!!

# Demo login for an example of the intended experience!

_For now there is a limited amount of game data as I want to lock the data down to a presentable set I can use for a demonstration purposes_

Login as `"demo1" "demo1"` (`username`, `password`) to see the user experience with games, connections, requests, etc!

## Deployed

The production instance of Gamer Buddy is deployed to Vercel. Pushed to the main branch deploy a new version to Vercel, and post install scipts are run to update the production database instance.

## Testing

_Due to the NextJs's use of new async server components, Jest/vite (and other common unit/integration test tools) can't test components if they are async server rendered (which almost everything in this app is!). It is mentioned in NextJs's documentation to rely on end-to-end tests for testing these new types of components. Due to this most testing is managed with Playwright in this project._

### Playwright:

End-to-end tests need to use a dummy or mock account which exists in the test/dev instance of Clerk auth. Setup, and tear down scripts, adds users, and relevant test data to allow browser based front end test as a real user.

Run tests with `npx playwright test`.

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

### local setup

1. install node.js.
2. install postgres.
3. configure local .env (requires several api keys and database connection strings).
4. install packages.
5. run prisma migration & generate client.
6. create permanent test user in clerk auth dev and add user creds to prisma seed scripts & automated test user data.
7. run 'postinstall' script to fetch game data and store in database.

