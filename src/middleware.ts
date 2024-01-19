import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // debug: true,
  publicRoutes: ["/", "/game(.*)", "/api/search-games(.*)", "/games(.*)",],
  ignoredRoutes: ["/api/webhook(.*)", "/_vercel/speed-insights/vitals(.*)"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};