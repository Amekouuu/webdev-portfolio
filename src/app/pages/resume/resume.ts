import { Component } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {
  resumeUrl = 'assets/resume/micko-resume.pdf';

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Resume | Micko Q. Alberto',
      description: 'Download the resume of Micko Q. Alberto — web development and SEO-focused work.',
    });
  }
}
