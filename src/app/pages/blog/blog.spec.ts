import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Blog } from './blog';
import { BLOG_POSTS } from '../../data/blog';

describe('Blog', () => {
  let fixture: ComponentFixture<Blog>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog],
      // Each post title is a routerLink, which needs a router to exist.
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('lists every post in data/blog.ts', () => {
    expect(el.querySelectorAll('.postItem').length).toBe(BLOG_POSTS.length);
  });

  it('links each post to its own /blog/:slug page', () => {
    // Compared as sorted sets: this checks every post is reachable, not the
    // display order, which the page is free to change.
    const hrefs = Array.from(el.querySelectorAll<HTMLAnchorElement>('.postItem__link'))
      .map(a => a.getAttribute('href'))
      .sort();
    const expected = BLOG_POSTS.map(p => `/blog/${p.slug}`).sort();

    expect(hrefs).toEqual(expected);
  });
});
