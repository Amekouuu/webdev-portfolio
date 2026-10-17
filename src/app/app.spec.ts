import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      // The navbar and footer use routerLink, which cannot be created without
      // a router. The original scaffold test omitted this and never passed.
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the site shell: navbar, a main region holding the outlet, and footer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-navbar')).toBeTruthy();
    expect(el.querySelector('main router-outlet')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });

  // Guards the label-content-name-mismatch fix: the logo showed "AMEKOU" but
  // was announced as "Go to Home", so voice control could not reach it.
  it("names the logo link with the logo's visible text", () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const brand = (fixture.nativeElement as HTMLElement).querySelector('a.brand');

    const visible = brand?.querySelector('.brand__text')?.textContent?.trim() ?? '';
    const label = brand?.getAttribute('aria-label') ?? '';

    expect(visible).not.toBe('');
    expect(label.toLowerCase()).toContain(visible.toLowerCase());
  });
});
