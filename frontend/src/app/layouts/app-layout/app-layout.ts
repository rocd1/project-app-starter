import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppBar } from '../designs/app/headers/app-bar/app-bar';
import { BottomNavigation } from '../designs/app/navigation/bottom/bottom-navigation';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    AppBar,
    BottomNavigation,
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {
  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected search(): void {
    // Search behavior will be implemented by the application.
  }
}
