import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from 'src/app/shared/models/general.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  UrlBase = environment.production ? environment.gcloud : environment.debugPC;

  constructor(private http: HttpClient,
  ) { }

  getData = async () => {
    return this.http.get<any>(`${this.UrlBase}/api/wre-poc/v1/dashboard`);
  }

  login(cc: any): Observable<Resultado> {
    return this.http.post<Resultado>(this.UrlBase + '/api/wre-poc/v1/login', cc);
  }


  getClaims(): Observable<Resultado> {
    return this.http.get<Resultado>(this.UrlBase + '/api/wre-poc/v1/claims/' + Number(localStorage.getItem('id')));
  }

  getJobDetails(idJob: string): Observable<Resultado> {
    return this.http.get<Resultado>(this.UrlBase + '/api/wre-poc/v1/jobs/' + idJob);
  }

  getOtherRecommendations(): Observable<Resultado> {
    return this.http.get<Resultado>(this.UrlBase + '/api/wre-poc/v1/jobs/recommendations/' + Number(localStorage.getItem('id')));
  }

}
