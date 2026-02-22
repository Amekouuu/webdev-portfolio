import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

import emailjs from '@emailjs/browser';

type Social = { label: string; href: string };

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  socials: Social[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/micko-alberto-b49906316/' },
    { label: 'Instagram', href: 'https://www.instagram.com/mcko.qrz/' },
  ];

  sent = false;
  sending = false;
  errorMsg = '';

  form!: FormGroup;

  private SERVICE_ID = 'service_oq6guxv';
  private TEMPLATE_ID = 'template_cieebsk';
  private PUBLIC_KEY = 'WwErruUkpcQbr-sPQ';

  constructor(private fb: FormBuilder, private seo: SeoService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.seo.set({
      title: 'Contact | Micko Q. Alberto',
      description: 'Contact Micko Q. Alberto — send a message or connect via social links.',
    });

    emailjs.init(this.PUBLIC_KEY);
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get subject() { return this.form.get('subject'); }
  get message() { return this.form.get('message'); }

  async submit() {
    this.sent = false;
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending = true;

    try {
      const now = new Date();

      const templateParams = {
        name: this.form.value.name,
        email: this.form.value.email,
        subject: this.form.value.subject,
        message: this.form.value.message,
        time: now.toLocaleString(),

        // optional metadata (use in template if you want)
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      };

      await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams);

      this.sent = true;
      this.form.reset();

      // auto-hide success after 5 seconds
      setTimeout(() => {
        this.sent = false;
      }, 5000);

    } catch (error: any) {
      console.error('EmailJS Error:', error);
      const msg = error?.text || error?.message || JSON.stringify(error);
      this.errorMsg = `Sending failed: ${msg}`;
    } finally {
      this.sending = false;
    }
  }
}