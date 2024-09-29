import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];

type TRole = keyof typeof roleBasedRoutes;
const roleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(pathname);
  // let user = undefined;
  const user = {
    name: "kuddus",
    role: "USER",
  };
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user.role && roleBasedRoutes[user?.role as TRole]) {
    const routes = roleBasedRoutes[user?.role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
  // return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/admin"],
};
