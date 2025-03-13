import { clerkMiddleware } from '@clerk/nextjs/server';

// eslint-disable-next-line import/no-default-export
export default clerkMiddleware({ signInUrl: '/auth/login' });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
