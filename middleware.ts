import { NextRequest, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  console.log({ url: request.nextUrl, device });
}

export const config = {
  matcher: "/post/:slug",
};
