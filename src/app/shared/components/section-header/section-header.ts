import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
