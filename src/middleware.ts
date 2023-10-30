import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const cookie = request.cookies.get("next-auth.session-token")?.value

    if (!cookie) { 
        return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
}

export const config = {
  matcher: ['/profile', '/connections']
}