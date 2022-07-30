import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.get("OursiteJWT");
  const BaseUrl = req.url; 
  const url = req.nextUrl.pathname;

  if (url.startsWith('/hesabim')) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL('/giris-yap', BaseUrl));
    }

    try {
       return NextResponse.next();
    } catch (e) {
      return NextResponse.rewrite("/giris-yap");
    }
  }

  if (url.startsWith('/mesaj')) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL('/giris-yap', BaseUrl));
    }

    try {
       return NextResponse.next();
    } catch (e) {
      return NextResponse.rewrite("/giris-yap");
    }
  }

  if (url.startsWith('/giris-yap')) {
    if (jwt) {
      try {
       return NextResponse.redirect(new URL('/', BaseUrl));
      } catch (e) {
        console.log(e)
      }
    }
    return NextResponse.next();
  }

  if (url.startsWith('/uye-ol')) {
    if (jwt) {
      try {
       return NextResponse.redirect(new URL('/', BaseUrl));
      } catch (e) {
        console.log(e)
      }
    }
    return NextResponse.next();
  }

  if (url.startsWith('/sifremi-unuttum')) {
    if (jwt) {
      try {
       return NextResponse.redirect(new URL('/', BaseUrl));
      } catch (e) {
        console.log(e)
      }
    }
    return NextResponse.next();
  }

  if (url.startsWith('/ilan-ver')) {
    if (jwt === undefined) {
      return NextResponse.rewrite(new URL('/giris-yap', BaseUrl));
    }

    try {
       return NextResponse.next();
    } catch (e) {
      return NextResponse.rewrite("/giris-yap");
    }
  }
  return NextResponse.next();
}