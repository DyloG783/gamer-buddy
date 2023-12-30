import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // debug: true,
  publicRoutes: ["/", "/game(.*)", "/api/search-games"],
  ignoredRoutes: ["/api/webhook(.*)"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};