import { NextRequest, NextResponse } from "next/server";

const isAdminRoute = (pathname: string) => {
    return pathname.startsWith('/api/admin');
}
const isUserRoute = (pathname: string) => {
    return pathname.startsWith('/api/users');
}
export default async function middleware(request: NextRequest){
    const role = request.headers.get("authorization") ?? '';
    const { pathname } = request.nextUrl;
    console.log(`role ${role}`);
    // if (isUserRoute(pathname) && !["user","admin"].includes(role)) {
    //     return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
    // }
    if (isAdminRoute(pathname) && role !== "admin") {
        return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
      }
    console.log(`Request ${request.method} to URL ${request.url}`);
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
}