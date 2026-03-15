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
    slug: 'frontend-development-has-evolved',
    title: 'Frontend Development Isn\'t Gone - It Just Evolved',
    date: '2026-03-10',
    summary:
      'If AI can build a landing page in 30 seconds. Then why are frontend developers still valuable than ever?',
    tags: ['Frontend', 'AI', 'Web Dev'],
    readMinutes: 6,
    featured: true,
    content: `
      <p>
        Let me be honest: every few months, a new wave of takes floods my feed claiming that frontend development is dying. Sometimes it's AI. Sometimes it's drag-and-drop CMS. Sometimes it's just burnout fatigue dressed up as industry analysis. And every time, I find myself disagreeing — not out of stubbornness, but because the evidence keeps pointing the other way.
      </p>

      <h2>The "AI will replace you" narrative</h2>
      <p>AI tools like Cursor, AntiGravity, and even the new GPT-5 are impressive, no doubt. They can generate code snippets, design mockups, and even entire landing pages in seconds. But here's the catch: who makes the prompts? Who checks for quality and accuracy? Who ensures the final product aligns with the brand and user needs? That's right — it's still us, the frontend developers. AI is a tool, not a replacement. It can handle repetitive tasks and generate boilerplate code, but it can't replace the creativity, problem-solving, and human touch that we bring to the table.
      </p>

      <h2>Frontend has expanded, not stalled</h2>
      <p>
        A common trend is that people confuse stability what stagnation. The core three of HTML, CSS, and JavaScript have been around for decades, and that's a good thing. It means we have a solid foundation to build on. But the frontend ecosystem has evolved tremendously with new frameworks, tools, and best practices emerging all the time. There's always something new to learn and master. The demand for skilled frontend developers is still strong, and in many cases, it's growing as more businesses recognize the importance of a great user experience.
      </p>

      <h2>What this means practically</h2>
    <p>
      The developers who are thriving aren't the ones ignoring AI — they're the ones using it to move faster up the ladder so they can spend more time on the hard, judgment-intensive work. Architecture decisions.
      Component API design. Accessibility audits. Performance profiling. The parts that matter and that a language
      model cannot do autonomously.
    </p>
    <p>
      Even in making my academic projects, I had to use AI to generate code snippets, but I still had to stitch them together, debug them, and make sure they worked in the context of my project. The AI can write code, but it can't understand the context of my specific use case or the constraints of my project. That's where I come in as a frontend developer.
    </p>
    <p>
      Frontend development isn't stagnant. It's just stopped being easy to dismiss as "just making things look pretty."
      That might be the most exciting thing about it right now.
    </p>
    `,
  },
  {
    slug: 'ai-is-your-friend-not-enemy',
    title: 'AI Is Your Friend, Not Your Enemy',
    date: '2026-03-03',
    summary:
      'How to embrace AI as a tool for creativity and productivity — not fear it as a threat.',
    tags: ['AI', 'Productivity'],

    readMinutes: 4,
    featured: false,
    content: `
      <p>Ever since artificial intelligence made its way into the mainstream, there’s been a lot of fear and skepticism around it — especially in creative fields. But I’ve found that AI can actually be a powerful ally if you approach it with the right mindset. Instead of seeing AI as a replacement for human creativity, I see it as a tool that can enhance and amplify our abilities. Whether it’s generating ideas, automating repetitive tasks, or providing new perspectives, AI has the potential to free us up to focus on the parts of our work that we truly enjoy and excel at.
      </p>

      <h2>Why AI Should Be Your Partner</h2>
      <p>Most of us fear the unknown, and understandably so. But AI is not some sentient being out to take our places, but more like a set of tools that can help us be more efficient and creative. It can handle mundane tasks, generate content ideas, and even assist in problem-solving. By embracing AI as a partner rather than an adversary, we can leverage its capabilities to enhance our work and open up new possibilities.
      </p>

      <h2>Reliance on Technology</h2>
      <p>Here however, comes the problem. You see, while AI can be a powerful tool, it's important to remember that even if you have the best of tools at your disposal, they are just that — tools. They can assist you, but they can't replace the human touch, creativity, and critical thinking that we bring to the table. Relying too heavily on AI can lead to a loss of those essential skills and a dependence on technology that may not always be reliable or ethical. It's crucial to strike a balance and use AI as a means to enhance our work, rather than letting it do all the work for us.
      </p>

      <h2>Balance, balance, balance.</h2>
      <p>
        The key is to use AI as a tool to augment our capabilities, not replace them. By maintaining a healthy balance between human creativity and AI assistance, we can create something truly special.
      </p>
    `,
  },
  {
    slug: 'seo-for-used-car-dealership',
    title: 'What I Learned Doing SEO for a Local Business',
    date: '2026-02-14',
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