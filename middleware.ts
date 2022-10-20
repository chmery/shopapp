import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
    const uidCookie = req.cookies.get("uid");
    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/profile", "/favourites", "/order-details"];
    const isRouteProtected = protectedRoutes.some((protectedRoute) =>
        pathname.includes(protectedRoute)
    );

    if (!uidCookie && isRouteProtected) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (uidCookie && pathname.includes("/auth/login")) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }
};

export default middleware;
