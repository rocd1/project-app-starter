import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { CsrfService } from '../auth/services/csrf.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfService = inject(CsrfService);

  let modifiedRequest = req.clone({
    withCredentials: true,
  });

  const isStateChangingRequest = [
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
  ].includes(req.method.toUpperCase());

  if (isStateChangingRequest) {
    const csrfToken = csrfService.getToken();

    if (csrfToken) {
      modifiedRequest = modifiedRequest.clone({
        setHeaders: {
          'X-CSRFToken': csrfToken,
        },
      });
    }
  }

  return next(modifiedRequest);
};

