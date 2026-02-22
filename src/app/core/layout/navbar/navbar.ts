import { Component, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnDestroy {
  isOpen = false;

  @ViewChild('menuBtn', { static: true }) menuBtn!: ElementRef<HTMLButtonElement>;

  private prevBodyOverflow = '';
  private prevBodyPaddingRight = '';

  private lockScroll() {
    // store previous values so we can restore perfectly
    this.prevBodyOverflow = document.body.style.overflow;
    this.prevBodyPaddingRight = document.body.style.paddingRight;

    // prevent background scroll
    document.body.style.overflow = 'hidden';

    // prevent layout shift when scrollbar disappears (desktop browsers)
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
  }

  private unlockScroll() {
    document.body.style.overflow = this.prevBodyOverflow;
    document.body.style.paddingRight = this.prevBodyPaddingRight;
  }

  open() {
    this.isOpen = true;
    this.lockScroll();

    // focus first link after open (small delay to ensure DOM renders)
    setTimeout(() => {
      const firstLink = document.querySelector<HTMLAnchorElement>('.menuPanel a');
      firstLink?.focus();
    }, 0);
  }

  close() {
    this.isOpen = false;
    this.unlockScroll();

    // return focus to button for accessibility
    setTimeout(() => this.menuBtn?.nativeElement.focus(), 0);
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  // ESC to close
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) this.close();
  }

  // Click outside panel to close (overlay area)
  onBackdropClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('menuOverlay')) this.close();
  }

  // safety: if component gets destroyed while open, restore scroll
  ngOnDestroy() {
    if (this.isOpen) this.unlockScroll();
  }
}