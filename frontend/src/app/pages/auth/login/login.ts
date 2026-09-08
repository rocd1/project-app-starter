import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/services/auth.service';
import { AuthStateService } from '../../../core/auth/services/auth-state';
import { ApiErrorService } from '../../../core/errors/api-error.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authStateService = inject(AuthStateService);
  private readonly apiErrorService = inject(ApiErrorService);
  private readonly router = inject(Router);

  protected readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal('');

  protected submit(): void {
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            this.authStateService.setUser(user);

            this.isSubmitting.set(false);

            void this.router.navigate(['/app']);
          },

          error: () => {
            this.isSubmitting.set(false);

            this.errorMessage.set(
              'Unable to load your account information. Please try again.',
            );
          },
        });
      },

      error: (error) => {
        this.isSubmitting.set(false);

        const apiError = this.apiErrorService.normalize(error);

        this.errorMessage.set(
          apiError.message ??
            'Unable to sign in right now. Please try again.',
        );
      },
    });
  }
}