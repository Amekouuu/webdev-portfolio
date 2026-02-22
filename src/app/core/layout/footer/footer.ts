import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

type Social = { label: string; href: string };

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  year = new Date().getFullYear();

  socials: Social[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/micko-alberto-b49906316/' },
    { label: 'GitHub', href: 'https://github.com/Amekouuu' },
    { label: 'Email', href: 'mailto:mqalberto12@gmail.com' },
  ];
}
