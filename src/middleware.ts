import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // debug: true,
  publicRoutes: ["/", "/game(.*)", "/api/search-games", "/api/auth/signin"],
  ignoredRoutes: ["/api/webhook(.*)"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};