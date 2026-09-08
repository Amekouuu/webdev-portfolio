import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, Project, academicYear } from '../../data/projects';

type Filter = 'all' | 'web' | 'design';
type Sort   = 'newest' | 'oldest' | 'featured' | 'az';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly filters: { value: Filter; label: string }[] = [
    { value: 'all',    label: 'All' },
    { value: 'web',    label: 'Web development' },
    { value: 'design', label: 'UI/UX design' },
  ];

  readonly sorts: { value: Sort; label: string }[] = [
    { value: 'newest',   label: 'Newest first' },
    { value: 'oldest',   label: 'Oldest first' },
    { value: 'featured', label: 'Featured first' },
    { value: 'az',       label: 'Name (A–Z)' },
  ];

  /** Exposed for the template — imported functions aren't callable from one. */
  readonly academicYear = academicYear;

  query = '';
  activeFilter: Filter = 'all';
  activeSort: Sort = 'newest';

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Projects — Micko Alberto | Web Development & UI/UX',
      description:
        'Web development and UI/UX projects by Micko Alberto — Angular builds, SEO work, and Figma case studies.',
    });
  }

  /** Search, then filter, then sort. Recomputed per change detection; with a
      handful of projects that is far cheaper than wiring up a cache. */
  get visible(): Project[] {
    const q = this.query.trim().toLowerCase();

    const matched = this.projects.filter(p => {
      if (this.activeFilter !== 'all' && p.type !== this.activeFilter) return false;
      if (!q) return true;
      return this.haystack(p).includes(q);
    });

    return this.sortBy(matched, this.activeSort);
  }

  get isFiltered(): boolean {
    return this.query.trim() !== '' || this.activeFilter !== 'all';
  }

  /** Announced politely so screen readers hear the list change as you type. */
  get resultLabel(): string {
    const n = this.visible.length;
    return `${n} ${n === 1 ? 'project' : 'projects'}`;
  }

  setFilter(filter: Filter): void {
    this.activeFilter = filter;
  }

  setSort(value: string): void {
    this.activeSort = value as Sort;
  }

  setQuery(value: string): void {
    this.query = value;
  }

  clearFilters(): void {
    this.query = '';
    this.activeFilter = 'all';
  }

  typeLabel(p: Project): string {
    return p.type === 'design' ? 'UI/UX design' : 'Web development';
  }

  /** Design work lives on Figma, so "Visit site" would misdescribe it. */
  primaryLinkLabel(p: Project): string {
    return p.type === 'design' ? 'Open in Figma' : 'Visit site';
  }

  private readonly projects: Project[] = PROJECTS;

  /** Includes the year so "2024" or "2024–25" narrows the list too. */
  private haystack(p: Project): string {
    return [p.name, p.description, p.tag ?? '', academicYear(p), ...p.tools]
      .join(' ')
      .toLowerCase();
  }

  private sortBy(list: Project[], sort: Sort): Project[] {
    // Copy first — Array.prototype.sort mutates in place, and PROJECTS is
    // module state shared with the home page.
    const copy = [...list];

    // sort() is stable throughout, so ties keep their authored order — which
    // matters most for the three projects that share the 2024–25 year.
    switch (sort) {
      case 'oldest':
        return copy.sort((a, b) => a.yearStart - b.yearStart);
      case 'featured':
        return copy.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
      case 'az':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return copy.sort((a, b) => b.yearStart - a.yearStart);
    }
  }
}
