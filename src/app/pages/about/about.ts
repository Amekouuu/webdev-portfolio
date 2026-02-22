import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

type Skill = { name: string; level: number; iconText: string };
type Cert = {
  name: string;
  issuer: string;
  url: string;
  pdfUrl?: string;
  validFrom?: string;
  validTo?: string;
};

// ✅ new social type uses images
type Social = {
  label: string;
  url: string;
  iconSrc: string;
  iconAlt: string;
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  title = 'About Me';
  subtitle = 'What drives me and my passion.';

  bioLines: string[] = [
    'I enjoy making websites search engine friendly and easy to use.',
    'I believe good design should be simple, functional, and easy to navigate—while good SEO helps ensure people can find it.',
    "Let’s connect! I’d love to hear from you about design, the web, or anything at all!",
  ];

  // ✅ image icons
  socials: Social[] = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/micko-alberto-b49906316/',
      iconSrc: 'assets/images/icons/linkedin.png',
      iconAlt: 'LinkedIn icon',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/Amekouuu',
      iconSrc: 'assets/images/icons/github.png',
      iconAlt: 'GitHub icon',
    },
    {
      label: 'Email',
      url: 'mailto:mqalberto12@gmail.com',
      iconSrc: 'assets/images/icons/google.png',
      iconAlt: 'Email icon',
    },
  ];

  profile = {
    name: 'Micko Q. Alberto',
    role: 'IT (Web Dev) Student • Angular • SEO',
    imageUrl: '',
    imageAlt: 'Profile picture of Micko Q. Alberto',
  };

  quickFacts = [
    { label: 'Base', value: 'Pampanga, PH' },
    { label: 'Focus', value: 'Front-End + SEO' },
    { label: 'Goal', value: 'Clean + Fast UI' },
  ];

  chips = ['Lighthouse', 'GA4 basics', 'Technical SEO', 'Responsive UI'];

  sections = [
    {
      heading: 'Background',
      body:
        "I’m currently studying IT (Web Development) at Holy Angel University. I enjoy building simple, readable web pages and turning designs into clean, working UI.",
      type: 'image',
      imageUrl: 'assets/images/holy-angel-university.jpg',
    },
    {
      heading: "What I’m working on",
      body:
        'I’m improving a client-style website for M&J Quality Used Cars (Mabalacat) where we practice SEO through blogs, audits, and optimization.',
      type: 'image',
      imageUrl: 'assets/images/mjqualitycars-background.png',
    },
  ];

  skills: Skill[] = [
    { name: 'HTML', level: 85, iconText: 'H' },
    { name: 'CSS', level: 80, iconText: 'C' },
    { name: 'JavaScript', level: 75, iconText: 'J' },
    { name: 'Angular', level: 70, iconText: 'A' },
    { name: 'Git', level: 70, iconText: 'G' },
    { name: 'SEO', level: 70, iconText: 'S' },
  ];

  certs: Cert[] = [
    {
      name: 'HubSpot SEO Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/zq0w4kl3/en/1/micko-alberto/seo',
      validFrom: 'Jan 9, 2026',
      validTo: 'Feb 8, 2027',
    },
    {
      name: 'HubSpot SEO II Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/p6w0zjt0/en/1/micko-alberto/seo-ii',
      validFrom: 'Feb 1, 2026',
      validTo: 'Mar 2, 2028',
    },
    {
      name: 'HubSpot Content Marketing Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/l0mr2v5k/en/1/micko-alberto/content-marketing',
      validFrom: 'Aug 26, 2025',
      validTo: 'Sep 25, 2027',
    },
    {
      name: 'Website UI/UX Designing using ChatGPT',
      issuer: 'Simplilearn SkillUp',
      url: 'https://simpli-web.app.link/e/yyfQm52OF0b',
      validFrom: 'Aug 23, 2025',
    },
  ];

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'About | Micko Q. Alberto',
      description:
        'About Micko Q. Alberto — IT Web Development student with certifications in SEO, SEO II, Content Marketing, and UI/UX design.',
    });
  }

  certMeta(c: Cert) {
    if (c.validFrom && c.validTo) return `(${c.validFrom} – ${c.validTo})`;
    if (c.validFrom) return `(${c.validFrom})`;
    return '';
  }

  /** ✅ smooth scroll helper for jump buttons */
  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    // If your top navbar is fixed/sticky, bump this to ~70
    const yOffset = 12;

    const y = el.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });

    // Accessibility: focus target without jumping again
    el.setAttribute('tabindex', '-1');
    (el as HTMLElement).focus({ preventScroll: true });
  }
}
