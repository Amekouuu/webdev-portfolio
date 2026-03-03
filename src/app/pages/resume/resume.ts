import { Component } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {
  /** 🔁 Drop your PDF at this path in /assets/ */
  private readonly pdfPath = '/assets/Micko_Alberto_Resume.pdf';

  resumeUrl: SafeResourceUrl;

  constructor(private seo: SeoService, private sanitizer: DomSanitizer) {
    this.seo.set({
      title: 'Resume | Micko Q. Alberto',
      description:
        'Download or view the resume of Micko Q. Alberto — front-end developer and SEO specialist.',
    });

    // Required: Angular blocks iframe src unless sanitized
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfPath);
  }

  download(): void {
    const a = document.createElement('a');
    a.href = this.pdfPath;
    a.download = 'Micko-Alberto-Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}