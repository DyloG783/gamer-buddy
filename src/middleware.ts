import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // debug: true,
  publicRoutes: ["/", "/game(.*)", "/api/search-games(.*)", "/games(.*)", "/about"],
  ignoredRoutes: ["/api/webhook(.*)", "/_vercel/speed-insights/vitals(.*)", "//accounts.gamer-buddy.com(.*)"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};