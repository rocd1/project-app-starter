import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CsrfService } from '../auth/services/csrf.service';

export function initializeApp(): Promise<void> {
  const csrfService = inject(CsrfService);

  return firstValueFrom(
    csrfService.initialize(),
  ).then(() => {
    console.log('CSRF initialization successful.');
  });
}