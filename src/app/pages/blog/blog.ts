import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BLOG_POSTS, BlogPost } from '../../data/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  // No scroll-reveal: the index is short enough to sit near the fold, and a
  // reveal that fails to fire hides the posts outright.
  imports: [DatePipe, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  private seo = inject(SeoService);

  posts: BlogPost[] = BLOG_POSTS;

  constructor() {
    this.seo.set({
      title: 'Blog — Micko Alberto | Web Development & SEO Notes',
      description:
        'Articles and insights on web development, programming, and technology by Micko Alberto.',
    });
  }
}