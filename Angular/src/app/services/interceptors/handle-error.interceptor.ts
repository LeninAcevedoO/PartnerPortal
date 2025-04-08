import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap, timeout, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import * as platform from 'platform';
import { Router } from '@angular/router';
import { ContextService } from '../services/context.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  private readonly REQUEST_TIMEOUT = 15000;
  
  constructor(
    private toastr: ToastrService, 
    private _utilsSvc: UtilsService,
    private router: Router,
    private _context: ContextService
  ) {}

  private async getClientIp(): Promise<string> {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error obteniendo la IP:', error);
      return 'unknown';
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentRoute = this.router.url || 'unknown';

    const usuario = sessionStorage.getItem('mat__resultant__pp__id') || '';
    const token = sessionStorage.getItem('mat__resultant__pp__tkn') || '';
    const idEmpresa = sessionStorage.getItem('mat__resultant__pp__company_id') || '';

    const deviceInfo = platform.description || 'unknown';

    return from(this.getClientIp()).pipe(
      switchMap(ip => {
        let modifiedRequest = request.clone({
          setHeaders: {
            'X-User': usuario,
            Authorization: `Bearer ${token}`,
            'X-Company': idEmpresa,
            'X-Client-IP': ip,
            'X-Device-Info': deviceInfo,
            'X-Current-Route': currentRoute
          },
        });

        if (request.body) {
          if (!environment.production) console.log(request.body);
          const encryptedBody = this._utilsSvc.encryptAES(JSON.stringify(request.body));
          modifiedRequest = modifiedRequest.clone({ body: { "data": encryptedBody } });
        }

        return next.handle(modifiedRequest).pipe(
          tap((data: any) => {
            if (data.type !== 0) {
              if (data.body.data && ![null, undefined, '', '{}', '[]'].includes(data.body.data)) {
                data.body.data = JSON.parse(this._utilsSvc.decryptAES(data.body.data));
                if(!environment.production) console.log(data.body.data);
              }
            }
          }),          
          timeout(this.REQUEST_TIMEOUT),
          catchError((err: any) => {
            if (err.name === 'TimeoutError') {
              this.toastr.error('The request took too long, please try again later.', 'Request Timeout');
              return throwError(() => new Error('Request Timeout'));
            }
            if (err.status === 0) {
              this.toastr.error('Verify your internet connection', 'Bad connection');
            } else if (err.status === 401) {
              this.toastr.warning('You\'re not authorizated', 'Error 401');
              this._context.logout();
            } else if (err.status === 404) {
              this.toastr.info('There\'s no information found', 'Error 404');
            } else {
              const mensaje = err.error?.mensaje || err.error?.message || 'Something went wrong, try again later';
              this.toastr.error(mensaje, `Error ${err.status}`);
            }

            return throwError(() => new Error(err.message));
          })
        );
      })
    );
  }
}
