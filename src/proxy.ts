import { NextResponse, type NextRequest } from "next/server";

// Old URLs for the Flexible Data Tables case study. Matched by exact path here
// because next.config redirects match case-insensitively, and
// /case-studies/Flexible-Data-Tables would also catch the lowercase target.
const LEGACY: Record<string, string> = {
  "/case-studies/Flexible-Data-Tables": "/case-studies/flexible-data-tables",
  "/case-studies/configurable-data-table": "/case-studies/flexible-data-tables",
  "/work/Flexible-Data-Tables": "/work/flexible-data-tables",
  "/work/configurable-data-table": "/work/flexible-data-tables",
};

export function proxy(request: NextRequest) {
  const destination = LEGACY[request.nextUrl.pathname];
  if (!destination) return NextResponse.next();
  return NextResponse.redirect(new URL(destination, request.url), 301);
}

export const config = {
  matcher: ["/case-studies/:slug", "/work/:slug"],
};
