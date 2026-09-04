import { Component, inject } from '@angular/core';

import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-app',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authService = inject(AuthService);

  testProtectedEndpoint(): void {
    this.authService.testProtectedEndpoint().subscribe({
      next: (response) => {
        console.log('Protected endpoint:', response);
      },
      error: (error) => {
        console.error('Protected endpoint error:', error);
      },
    });
  }
}