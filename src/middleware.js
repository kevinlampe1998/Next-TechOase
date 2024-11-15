import { NextResponse } from 'next/server';

export async function middleware(req) {

    const { pathname } = req.nextUrl;
  
    if (pathname === '/register-or-login') {
        return NextResponse.next();
    }
  const token = req?.cookies?.get('token')?.value;
  //   const token = await req?.cookies?._parsed?.get('token')?.value;

  //   console.log('Middleware executed for:', req.url);

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/register-or-login', req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/', '/:path'],
};