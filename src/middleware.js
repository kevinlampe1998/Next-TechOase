import { NextResponse } from 'next/server';

export async function middleware(req) {

    const { pathname } = req.nextUrl;
  
    if (pathname === '/pages/register-or-login') {
        return NextResponse.next();
    }
  const token = req?.cookies?.get('token')?.value;
  //   const token = await req?.cookies?._parsed?.get('token')?.value;

  //   console.log('Middleware executed for:', req.url);

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/pages/register-or-login', req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/',
      '/pages/cart',
      '/pages/contact',
      '/pages/faq',
      '/pages/new-in-store',
      '/pages/rating',
      '/pages/see-my-products',
      '/pages/set-used-item',
      '/pages/team-project',
      '/pages/used-items',
      '/pages/user-profile',
      // '/pages/',
      // '/pages/',
      // '/:path',
    ],
};