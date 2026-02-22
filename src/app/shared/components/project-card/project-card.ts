import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Project } from '../../../data/projects'; // adjust path if needed

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project!: Project;
}
