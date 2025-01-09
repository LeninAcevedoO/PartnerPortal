import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  
  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Recuperar los valores de sessionStorage
    const usuario = sessionStorage.getItem('usuario') || '';
    const token = sessionStorage.getItem('sessionToken') || '';
    const idEmpresa = sessionStorage.getItem('idEmpresa') || '';

    // Clonar la solicitud y agregar encabezados personalizados
    const modifiedRequest = request.clone({
      setHeaders: {
        Usuario: usuario,
        Authorization: `Bearer ${token}`, // Incluye el token si se requiere en formato Bearer
        IdEmpresa: idEmpresa,
      },
    });

    return next.handle(modifiedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.toastr.error('Verify your internet connection', 'Bad conection');
        } else if (err.status === 404) {
          this.toastr.error('There\'s no information found', 'Error 404');
          return [];
        } else {
          const mensaje = err.error?.mensaje || err.error?.message || 'Something went wrong, try again later';
          this.toastr.error(mensaje, `Error ${err.status}`);
        }

        return throwError(() => new Error(err.message));
      })
    );
  }
}
