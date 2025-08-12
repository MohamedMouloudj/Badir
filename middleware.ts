import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { AUTHORIZED_REDIRECTION, forMiddleware } from "./data/routes";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const sessionCookie = getSessionCookie(request);
  // Performance issue
  // const { data: session } = await betterFetch<Session>(
  //   "/api/auth/get-session",
  //   {
  //     baseURL: process.env.BETTER_AUTH_URL,
  //     headers: {
  //       //get the cookie from the request
  //       cookie: request.headers.get("cookie") || "",
  //     },
  //   }
  // );

  const isPublicRoute = forMiddleware.publicRoutes.includes(pathname);
  const isAuthRoute = forMiddleware.authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isApiAuthRoute = pathname.startsWith(forMiddleware.apiAuthPrefix);

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (sessionCookie) {
      // if (!session?.user.profileCompleted && pathname !== "/complete-profile") {
      //   return NextResponse.redirect(new URL("/complete-profile", request.url));
      // } ---> Move it to component level validation
      return NextResponse.redirect(
        new URL(AUTHORIZED_REDIRECTION, request.url)
      );
    }
    return null;
  }

  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
