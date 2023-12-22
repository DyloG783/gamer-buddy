import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ debug: false });

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  publicRoutes: ["/"]
};