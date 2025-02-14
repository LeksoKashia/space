import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ClientStore } from '../../store/clients.store';

function trimErrorString(str: string) {
  const index = str.lastIndexOf(':');
  return str.slice(index);
}

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const store = inject(ClientStore);
  return next(req).pipe(
    catchError((error) => {
      const newError = `Status Code${trimErrorString(error.message)}`;
      store.setError(newError);
      return throwError(() => newError);
    }),
    tap(() => {
      store.setError(undefined);
    })
  );
};
