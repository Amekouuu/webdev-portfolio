import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Home | Micko Alberto',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About | Micko Alberto',
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.Projects),
    title: 'Projects | Micko Alberto',
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.Blog),
    title: 'Blog | Micko Alberto',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-detail').then(m => m.BlogDetail),
    title: 'Blog | Micko Alberto',
  },
  {
    path: 'resume',
    loadComponent: () => import('./pages/resume/resume').then(m => m.Resume),
    title: 'Resume | Micko Alberto',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    title: 'Contact | Micko Alberto',
  },
  // Renders a real 404 page instead of silently redirecting to home, which made
  // every mistyped URL look like duplicate content. vercel.json serves the
  // generated 404.html with a genuine HTTP 404 for unmatched paths.
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: 'Page not found | Micko Alberto',
  },
];