import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Only match the landing page and its locale variants
  // Exclude blog, workouts, api, and static files
  matcher: ['/', '/(es|pt)', '/(es|pt)/'],
};

