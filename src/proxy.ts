import { NextResponse, type NextRequest } from "next/server";

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER ?? "inrcliqdemo";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? "inrcliqdemo@100%";

function isBasicAuthEnabled() {
  if (process.env.BASIC_AUTH_ENABLED === "true") return true;
  if (process.env.BASIC_AUTH_ENABLED === "false") return false;
  // Protect hosted deploys by default (Vercel sets VERCEL=1).
  return process.env.VERCEL === "1";
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="INRCLIQ Demo", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function credentialsMatch(header: string | null) {
  if (!header?.startsWith("Basic ")) return false;

  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return false;

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    return username === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  if (!isBasicAuthEnabled()) {
    return NextResponse.next();
  }

  if (credentialsMatch(request.headers.get("authorization"))) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico and common static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
