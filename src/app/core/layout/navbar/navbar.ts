import { Component, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnDestroy {
  isOpen = false;

  @ViewChild('menuBtn', { static: true }) menuBtn!: ElementRef<HTMLButtonElement>;

  private prevBodyOverflow = '';
  private prevBodyPaddingRight = '';

  constructor(public themeService: ThemeService) {}

  private lockScroll() {
    this.prevBodyOverflow = document.body.style.overflow;
    this.prevBodyPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';

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

    setTimeout(() => {
      const firstLink = document.querySelector<HTMLAnchorElement>('#menuPanel a');
      firstLink?.focus();
    }, 0);
  }

  close() {
    this.isOpen = false;
    this.unlockScroll();

    setTimeout(() => this.menuBtn?.nativeElement.focus(), 0);
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) this.close();
  }

  onBackdropClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('menuOverlay')) this.close();
  }

  ngOnDestroy() {
    if (this.isOpen) this.unlockScroll();
  }
}