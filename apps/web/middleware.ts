import { NextRequest, NextResponse } from "next/server";
import { createAuthClient } from "better-auth/client";

const client = createAuthClient();

const publicRoutes = ["/login", "/register", "/", "/api/auth/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute) {
    const { data: session } = await client.getSession({
      fetchOptions: {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    });

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
