import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  
  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if (err.status == 0)
          this.toastr.error('Verifica tu conexión a internet', 'Error de conexión');
        if (err.status == 404)
          return [];
        if (err.status != 0) {
          const mensaje = err.error.mensaje ? err.error.mensaje : err.error.message
          this.toastr.error(mensaje, 'Error ' + err.status);
        }

        return throwError(() => new Error(err.message));
      }));
  }
}
