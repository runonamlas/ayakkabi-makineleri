import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const url = req.url;
  //console.log("her ",cookies.OursiteJWT)

  if (url.includes("/giris-yap")) {
    if (jwt) {
      try {
       return NextResponse.redirect(new URL('/', url));
      } catch (e) {
        console.log(e)
      }
    }
    return NextResponse.next();
  }
  if (url.includes("/uye-ol")) {
    if (jwt) {
      try {
       return NextResponse.redirect(new URL('/', url));
      } catch (e) {
        console.log(e)
      }
    }
    return NextResponse.next();
  }

  if (url.includes("/sifremi-unuttum")) {
    if (jwt) {
      try {
       return NextResponse.redirect(new URL('/', url));
      } catch (e) {
        console.log(e)
      }
    }
    return NextResponse.next();
  }

  if (url.includes('/ilan-ver')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/giris-yap', url));
    }

    try {
       return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("/giris-yap");
    }
  }
  if (url.includes('/mesaj')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/giris-yap', url));
    }

    try {
       return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("/giris-yap");
    }
  }

  if (url.includes('/hesabim')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/giris-yap', url));
    }

    try {
       return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect("/giris-yap");
    }
  }
  return NextResponse.next();
}