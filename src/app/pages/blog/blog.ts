import { Component } from '@angular/core';
import { NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BLOG_POSTS, BlogPost } from '../../data/blog';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, DatePipe, RouterLink, RevealDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  posts: BlogPost[] = BLOG_POSTS;

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Blogs | Micko Q. Alberto',
      description:
        'Articles and insights on web development, programming, and technology by Micko Q. Alberto.',
    });
  }
}