import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ApiErrorService } from '../../../core/errors/api-error.service';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly apiErrorService = inject(ApiErrorService);
  private readonly router = inject(Router);

  protected readonly registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirm: ['', [Validators.required]],
  });

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal('');

  protected submit(): void {
    this.errorMessage.set('');
    this.clearServerErrors();

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    if (formValue.password !== formValue.password_confirm) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isSubmitting.set(true);

    this.authService.register(formValue).subscribe({
      next: () => {
        this.isSubmitting.set(false);

        void this.router.navigate(['/login']);
      },

      error: (error) => {
        this.isSubmitting.set(false);

        const apiError = this.apiErrorService.normalize(error);

        this.applyFieldErrors(apiError.fieldErrors);

        if (apiError.message) {
          this.errorMessage.set(apiError.message);
        }
      },
    });
  }

  private applyFieldErrors(
    fieldErrors: Record<string, string[]>,
  ): void {
    for (const [fieldName, messages] of Object.entries(fieldErrors)) {
      const control = this.registerForm.get(fieldName);

      if (!control || messages.length === 0) {
        continue;
      }

      control.setErrors({
        ...control.errors,
        server: messages[0],
      });

      control.markAsTouched();
    }
  }

  private clearServerErrors(): void {
    for (const control of Object.values(this.registerForm.controls)) {
      if (!control.errors?.['server']) {
        continue;
      }

      const errors = { ...control.errors };
      delete errors['server'];

      control.setErrors(
        Object.keys(errors).length > 0 ? errors : null,
      );
    }
  }
}