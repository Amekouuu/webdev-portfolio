import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Home | Micko Q. Alberto',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About | Micko Q. Alberto',
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.Projects),
    title: 'Projects | Micko Q. Alberto',
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.Blog),
    title: 'Blog | Micko Q. Alberto',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-detail').then(m => m.BlogDetail),
    title: 'Blog | Micko Q. Alberto',
  },
  {
    path: 'resume',
    loadComponent: () => import('./pages/resume/resume').then(m => m.Resume),
    title: 'Resume | Micko Q. Alberto',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    title: 'Contact | Micko Q. Alberto',
  },
  // Renders a real 404 page instead of silently redirecting to home, which made
  // every mistyped URL look like duplicate content. Note: the host still returns
  // HTTP 200 for this (SPA catch-all), so it is a soft 404 until prerendering
  // emits a real 404.html.
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: 'Page not found | Micko Q. Alberto',
  },
];