import { Component } from '@angular/core';
import { NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BLOG_POSTS, BlogPost } from '../../data/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  // No scroll-reveal: the index is short enough to sit near the fold, and a
  // reveal that fails to fire hides the posts outright.
  imports: [NgFor, DatePipe, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  posts: BlogPost[] = BLOG_POSTS;

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Blog — Micko Alberto | Web Development & SEO Notes',
      description:
        'Articles and insights on web development, programming, and technology by Micko Alberto.',
    });
  }
}