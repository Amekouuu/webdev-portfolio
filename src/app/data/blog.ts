// src/app/data/blog.ts
// 🔁 Replace with your real articles — content field accepts HTML strings

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date string e.g. '2025-01-10' */
  date: string;
  summary: string;
  tags: string[];
  readMinutes: number;
  /** HTML string — write your post content directly here */
  content: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'angular-seo-guide',
    title: 'How I Made My Angular Portfolio SEO-Friendly',
    date: '2025-01-10',
    summary:
      'A practical walkthrough of Angular hydration, dynamic meta tags, Open Graph, and structured data for portfolio sites.',
    tags: ['Angular', 'SEO', 'Web Dev'],
    readMinutes: 6,
    featured: true,
    content: `
      <p>
        When I started rebuilding my portfolio in Angular, SEO was the first thing I worried about.
        Single-page apps are notoriously hard for crawlers — but Angular's built-in hydration
        makes it a lot more manageable than it used to be.
      </p>

      <h2>Why Angular SEO is Tricky</h2>
      <p>
        By default, Angular renders everything client-side. That means Google's crawler
        sees an empty <code>&lt;app-root&gt;</code> until JavaScript runs.
        With <code>provideClientHydration()</code>, Angular pre-renders the page on the server
        and hands it off to the client — giving crawlers real HTML to index.
      </p>

      <h2>Setting Up Dynamic Meta Tags</h2>
      <p>
        I built a simple <code>SeoService</code> that wraps Angular's <code>Meta</code>
        and <code>Title</code> services. Every page calls <code>seo.set()</code> in its
        constructor with a title and description. Open Graph tags get updated at the same time,
        so link previews on LinkedIn and Twitter always show the right content.
      </p>

      <h2>Structured Data</h2>
      <p>
        I added a JSON-LD <code>Person</code> schema directly in <code>index.html</code>.
        It tells Google my name, job title, and social profiles — which helps surface
        my portfolio in branded searches.
      </p>

      <p>
        The full setup took about two hours. Most of it was just being systematic:
        one service, one call per page, and a pre-launch checklist.
      </p>
    `,
  },
  {
    slug: 'css-custom-properties',
    title: 'CSS Custom Properties Are Your Best Design System',
    date: '2024-12-02',
    summary:
      'Why CSS variables beat any UI framework for small-to-mid scale projects — and how I use them in every portfolio build.',
    tags: ['CSS', 'Design Systems'],
    readMinutes: 4,
    featured: false,
    content: `
      <p>
        Every time I start a new project, someone asks why I'm not using Tailwind or Bootstrap.
        The honest answer: for a portfolio or small product site, CSS custom properties
        give me everything I need with zero overhead.
      </p>

      <h2>The Token System</h2>
      <p>
        I define all my colors, spacing, and typography as <code>:root</code> variables.
        <code>--royal</code>, <code>--gold</code>, <code>--hero-bg</code> — everything
        has a name that makes sense in context. When I change a brand color,
        I change it in one place.
      </p>

      <h2>Dark Mode in 10 Lines</h2>
      <p>
        Since all my colors are variables, dark mode is just a
        <code>[data-theme='dark']</code> block that overrides the tokens.
        No JavaScript class toggling required — just one attribute on
        <code>&lt;html&gt;</code> and CSS does the rest.
      </p>

      <h2>When to Reach for a Framework</h2>
      <p>
        If your team is 5+ people or you're building a large app with hundreds of components,
        a design system library makes sense. For a solo portfolio?
        Custom properties are faster to write, easier to debug, and produce smaller bundles.
      </p>
    `,
  },
  {
    slug: 'seo-for-used-car-dealership',
    title: 'What I Learned Doing SEO for a Local Business',
    date: '2024-10-18',
    summary:
      'Lessons from building and optimizing an Angular site for M&J Quality Used Cars — local SEO, page speed, and what actually moved the needle.',
    tags: ['SEO', 'Case Study', 'Angular'],
    readMinutes: 5,
    featured: false,
    content: `
      <p>
        M&J Quality Used Cars was my first real client project. Beyond just building the site,
        I was responsible for making sure it ranked locally — which meant learning a lot
        about SEO fast.
      </p>

      <h2>Local SEO First</h2>
      <p>
        For a local business, Google Business Profile matters more than anything else.
        I made sure the site's NAP (Name, Address, Phone) matched the GBP listing exactly,
        and added LocalBusiness structured data to the homepage.
      </p>

      <h2>Page Speed on Mobile</h2>
      <p>
        Most of their customers search on mobile. I focused on image optimization —
        converting everything to WebP, adding <code>loading="lazy"</code> to below-fold images,
        and keeping the critical CSS inline. Core Web Vitals went from red to green.
      </p>

      <h2>What Actually Moved the Needle</h2>
      <p>
        Consistent content. I helped them publish short blog posts about car buying tips
        and local inventory updates. Within three months, organic traffic was up noticeably
        for branded and near-me searches.
      </p>
    `,
  },
];

export const FEATURED_POSTS = BLOG_POSTS.filter(p => p.featured);