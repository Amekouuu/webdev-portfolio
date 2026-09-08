import { Routes } from '@angular/router';

/**
 * No `title` on these routes on purpose. Angular's TitleStrategy runs on
 * NavigationEnd, after the component constructor, so a route title silently
 * overwrote every SeoService title: <title> and og:title disagreed on all
 * nine pages, and every blog post shared the one title "Blog | Micko Alberto".
 * SeoService.set() is the single owner now — each page component calls it.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.Projects),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.Blog),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-detail').then(m => m.BlogDetail),
  },
  {
    path: 'resume',
    loadComponent: () => import('./pages/resume/resume').then(m => m.Resume),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
  },
  // Renders a real 404 page instead of silently redirecting to home, which made
  // every mistyped URL look like duplicate content. vercel.json serves the
  // generated 404.html with a genuine HTTP 404 for unmatched paths.
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
  },
];