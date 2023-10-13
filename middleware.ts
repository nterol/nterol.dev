
import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  if (viewport === "mobile") {
    const { url } = request;
    const mobileURl = url.replace("/post", "/post/mobile");

    NextResponse.rewrite(mobileURl);
  }
}

export const config = {
  matcher: "/post/:slug*",
};
