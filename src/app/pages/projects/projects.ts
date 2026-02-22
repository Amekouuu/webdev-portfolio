import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, Project } from '../../data/projects';
import { SectionHeader } from '../../shared/components/section-header/section-header';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeader],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = PROJECTS;

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Projects | Micko Q. Alberto',
      description: 'Projects by Micko Q. Alberto — selected web dev and SEO-focused work.',
    });
  }
}
