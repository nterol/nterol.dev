import { NextRequest, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  console.log({ viewport });
}

export const config = {
  matcher: "/post/:slug*",
};
