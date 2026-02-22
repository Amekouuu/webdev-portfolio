import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealOnce: boolean = true;
  @Input() revealThreshold: number = 0.12;
  @Input() revealRootMargin: string = '0px 0px -10% 0px';

  private io?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('reveal');

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }

    this.io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          if (this.revealOnce) this.io?.unobserve(element);
        } else if (!this.revealOnce) {
          element.classList.remove('is-visible');
        }
      });
    }, {
      threshold: this.revealThreshold,
      rootMargin: this.revealRootMargin
    });

    this.io.observe(element);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
