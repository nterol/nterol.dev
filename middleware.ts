import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  if (viewport === 'mobile') {
    return NextResponse.rewrite(request.url.replace('/article/', '/article/mobile/'));
  }
}

export const config = {
  matcher: '/article/:slug*',
};
