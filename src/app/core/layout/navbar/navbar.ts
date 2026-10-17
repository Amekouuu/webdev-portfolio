import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ThemeService } from '../../services/theme.service';

/**
 * Header bar plus a drop-down menu panel.
 *
 * The panel is a disclosure (a button that shows/hides a region), not a modal
 * dialog: it covers only part of the page, so the page stays scrollable and
 * Tab is free to leave it. The old full-screen version needed a scroll lock
 * and a focus trap because it hid everything behind it; this one closes
 * itself instead when focus or a click lands outside the header.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  themeService = inject(ThemeService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  isOpen = false;

  @ViewChild('menuBtn', { static: true }) menuBtn!: ElementRef<HTMLButtonElement>;

  open() {
    this.isOpen = true;
    // After the panel renders: start on the current page's link, so arrowing
    // or tabbing begins from "you are here".
    setTimeout(() => {
      const panel = this.host.nativeElement.querySelector('#menuPanel');
      const target =
        panel?.querySelector<HTMLAnchorElement>('a.isActive') ??
        panel?.querySelector<HTMLAnchorElement>('a');
      target?.focus();
    }, 0);
  }

  /**
   * @param refocus Return focus to the Menu button. True for Escape and the
   *   button itself; false when a link was chosen (focus belongs to the new
   *   page) or the user already clicked/tabbed somewhere else.
   */
  close(refocus = true) {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (refocus) setTimeout(() => this.menuBtn?.nativeElement.focus(), 0);
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent) {
    if (!this.host.nativeElement.contains(e.target as Node)) this.close(false);
  }

  /** Tabbing past the last menu item (or anywhere outside the header) closes it. */
  @HostListener('focusout', ['$event'])
  onFocusOut(e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    if (next && !this.host.nativeElement.contains(next)) this.close(false);
  }
}
