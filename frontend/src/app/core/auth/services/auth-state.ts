import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly authService = inject(AuthService);

  private readonly currentUserSubject =
    new BehaviorSubject<User | null>(null);

  readonly currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  private initialized = false;

  initialize(): Observable<User | null> {
    if (this.initialized) {
      return this.currentUser$;
    }

    this.initialized = true;

    return this.authService.getCurrentUser().pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      }),
    );
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
  }
}