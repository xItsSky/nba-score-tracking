import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function KeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(
    req.clone({
      setHeaders: {
        'X-RapidAPI-Key': environment.apiKey,
        'X-RapidAPI-Host': environment.apiHost,
      },
    })
  );
}
