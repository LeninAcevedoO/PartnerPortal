// src/app/services/services/api.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private urlApi = 'https://wre-poc-service-py-5eiikqaheq-uc.a.run.app/jobs_all';

  constructor(private http: HttpClient) {}

  public getData(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }
}
