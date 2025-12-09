// This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//   return NextResponse.redirect(new URL("/home", request.url));
// }

import { auth } from "@/app/_lib/auth";

export const proxy = auth;

export const config = {
  matcher: ["/account"],
};
