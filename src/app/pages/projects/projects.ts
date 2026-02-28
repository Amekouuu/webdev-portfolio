import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, Project } from '../../data/projects';
import { SectionHeader } from '../../shared/components/section-header/section-header';

type Filter = 'all' | 'web' | 'design';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeader],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = PROJECTS;

  activeFilter: Filter = 'all';

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Projects | Micko Q. Alberto',
      description: 'Projects by Micko Q. Alberto — selected web dev and UI/UX work.',
    });
  }

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.type === this.activeFilter);
  }

  setFilter(filter: Filter) {
    this.activeFilter = filter;
  }

  openProject(p: Project) {
    const url = p.liveUrl || p.repoUrl;
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }

  // keyboard accessibility for the clickable card
  onCardKeydown(event: KeyboardEvent, p: Project) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openProject(p);
    }
  }

  stop(event: Event) {
    event.stopPropagation();
  }
}