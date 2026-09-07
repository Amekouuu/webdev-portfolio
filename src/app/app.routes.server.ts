import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './data/blog';

// Routes are declared explicitly rather than via a `**` Prerender catch-all:
// the catch-all reports routes as prerendered but does not emit their HTML.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'resume', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },

  // Parameterized routes cannot be discovered automatically.
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG_POSTS.map(post => ({ slug: post.slug })),
  },

  // The 404 wildcard matches unbounded URLs, so it ships as the client-rendered
  // fallback rather than a prerendered file.
  { path: '**', renderMode: RenderMode.Client },
];
