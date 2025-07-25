import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    "/dashboard",
    "/class/:path*",
    "/discussion",
    "/discussion/:path*",
    "/notes/:path*",
    "/notes/upload/:path*"
  ]
};