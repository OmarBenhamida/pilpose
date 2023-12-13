import { Location } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpStatusConst } from './HttpStatusResponses';
import { Observable } from 'rxjs';
import { LoginAdminService } from 'src/app/login-admin/login-admin.service';
import { User } from 'src/app/login-admin/User';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginAdminService,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let user: User = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    console.warn(user)
    if (user && user.token_dto.token) {
      request = request.clone({
        setHeaders: {
          Authorization: user.token_dto.token,
        },
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusConst.NOT_AUTHORIZED) {
          if (user && user.token_dto.refresh) {
            request = request.clone({
              setHeaders: {
                Authorization: user.token_dto.refresh,
              },
            });
            return next.handle(request).pipe(
              catchError((err: HttpErrorResponse) => {
                return throwError(err);
              })
            );
          } else {
            this.loginService.logout();
          }
        } else if (error.status === HttpStatusConst.FORBIDDEN) {
          alert('FORBIDDEN');
        } else if (
          error.status === HttpStatusConst.INTERNAL_SERVER_ERROR ||
          error.status === HttpStatusConst.BAD_REQUEST
        ) {
          if (error.error.trace.includes('AuthenticationException')) {
            alert('Password/username incorrect');
          }
        }
        return throwError(error);
      })
    );
  }
}
