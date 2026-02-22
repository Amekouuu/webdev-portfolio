import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Resume } from './pages/resume/resume';
import { Contact } from './pages/contact/contact';


export const routes: Routes = [
  { path: '', component: Home, title: 'Home | Micko Q. Alberto' },
  { path: 'about', component: About, title: 'About | Micko Q. Alberto' },
  { path: 'projects', component: Projects, title: 'Projects | Micko Q. Alberto' },
  { path: 'resume', component: Resume, title: 'Resume | Micko Q. Alberto' },
  { path: 'contact', component: Contact, title: 'Contact | Micko Q. Alberto' },
  { path: '**', redirectTo: '' },
];
