import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  private readonly REQUEST_TIMEOUT = 10000;
  
  constructor(private toastr: ToastrService,
    private _utilsSvc: UtilsService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Recuperar los valores de sessionStorage
    const usuario = sessionStorage.getItem('usuario') || '';
    const token = sessionStorage.getItem('sessionToken') || '';
    const idEmpresa = sessionStorage.getItem('idEmpresa') || '';
    let modifiedRequest = request.clone({
      setHeaders: {
        Usuario: usuario,
        Authorization: `Bearer ${token}`,
        IdEmpresa: idEmpresa,
      },
    });

    if (request.body) {
      console.log(request.body)
      const encryptedBody = this._utilsSvc.encryptAES(JSON.stringify(request.body));
      modifiedRequest = modifiedRequest.clone({ body: { "data": encryptedBody} });
    }

    return next.handle(modifiedRequest).pipe(
      timeout(this.REQUEST_TIMEOUT), // 🚀 Timeout de 10 segundos
      catchError((err: any) => {
        if (err.name === 'TimeoutError') {
          this.toastr.error('The request took too long, please try again later.', 'Request Timeout');
          return throwError(() => new Error('Request Timeout'));
        }

        if (err.status === 0) {
          this.toastr.error('Verify your internet connection', 'Bad connection');
        } else if (err.status === 404) {
          this.toastr.error('There\'s no information found', 'Error 404');
        } else {
          const mensaje = err.error?.mensaje || err.error?.message || 'Something went wrong, try again later';
          this.toastr.error(mensaje, `Error ${err.status}`);
        }

        return throwError(() => new Error(err.message));
      })
    );
  }
}
