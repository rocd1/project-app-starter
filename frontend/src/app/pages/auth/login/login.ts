import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/services/auth.service';
import { AuthStateService } from '../../../core/auth/services/auth-state';

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
  private readonly router = inject(Router);

  protected readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  protected isSubmitting = false;
  protected errorMessage = '';

  protected submit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            this.authStateService.setUser(user);

            this.isSubmitting = false;

            void this.router.navigate(['/app']);
          },

          error: () => {
            this.isSubmitting = false;

            this.errorMessage =
              'Unable to load your account information. Please try again.';
          },
        });
      },

      error: (error) => {
        this.isSubmitting = false;

        if (error.status === 400 || error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
          return;
        }

        this.errorMessage =
          'Unable to sign in right now. Please try again.';
      },
    });
  }
}