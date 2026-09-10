import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { BLOG_POSTS, BlogPost } from '../../data/blog';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
})
export class BlogDetail implements OnInit {
  post: BlogPost | undefined;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.post = BLOG_POSTS.find(p => p.slug === slug);

    if (this.post) {
      this.seo.set({
        title: `${this.post.title} | Micko Alberto`,
        description: this.post.summary,
        type: 'article',
        // `headline` deliberately drops the " | Micko Alberto" suffix the
        // <title> carries — rich results print headline verbatim.
        article: {
          headline: this.post.title,
          datePublished: this.post.date,
          keywords: this.post.tags,
        },
      });
    }
  }
}