import { NextResponse } from 'next/server'

export function middleware(req) {
  const jwt = req.cookies.get("OursiteJWT");
  const BaseUrl = req.url; 
  const url = req.nextUrl.pathname;

  if(jwt === undefined) {
    if (url.startsWith('/hesabim') || url.startsWith('/mesaj') || url.startsWith('/ilan-ver')) {
      return NextResponse.redirect(new URL('/giris-yap', BaseUrl));
    }else{
      return NextResponse.next();
    }
  }else {
    if (url.startsWith('/giris-yap') || url.startsWith('/uye-ol') || url.startsWith('/sifremi-unuttum')) {
      return NextResponse.redirect(new URL('/', BaseUrl));
    }else {
      return NextResponse.next();
    }
  }
}