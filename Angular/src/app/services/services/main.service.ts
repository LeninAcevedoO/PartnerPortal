import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Resultado } from "src/app/shared/models/general.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class MainService {
  UrlBase = environment.production ? environment.gcloud : environment.debugPC;

  constructor(private http: HttpClient) {}

  //#region General

  login(cc: any): Observable<Resultado> {
    return this.http.post<Resultado>(this.UrlBase + "/api/pp/v1/login", cc);
  }

  logRouteVisit(data: any) {
    return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/activity`, data);
    // .subscribe({
    //   next: () => console.log('Registro enviado con éxito'),
    //   error: (err) => console.error('Error al enviar el registro', err),
    // });
  }

  //#endregion

  //#region Catalogs

  getCatEnterprices = async() => {
    return this.http.get<Resultado>(this.UrlBase + "/api/pp/v1/catalogs/enterprices");
  }

  getCatRoles = async() => {
    return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/catalogs/roles`);
  }

  getCatEstatus = async() => {
    return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/catalogs/estatus`);
  }

  getCatAtendant = async() => {
    return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/catalogs/estatus/atendant`);
  }

  //#endregion

  //#region Administration

    //#region Enterprice

    getEnterprices(): Observable<Resultado> {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice`);
    }

    getEnterprice = async(idEnterprice: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice/${idEnterprice}`);
    }

    setEnterprice= async(enterprice: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice`, enterprice);
    }

    updateEnterprice  = async(enterprice: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice`, enterprice);
    }

    updateEnterpriceStatus  = async(enterprice: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice/${enterprice.company_id}/status/${enterprice.status_id}`, {});
    }

    //#region Roles

    getRoles(): Observable<Resultado> {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/role`);
    }    

    getRole = async(idRol: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/role/${idRol}`);
    }

    setRole = async(rol: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/role`, rol);
    }


    updateRole  = async(rol: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/role`, rol);
    }

    updateRoleStatus  = async(rol: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/role/${rol.role_id}/status/${rol.status_id}`, {});
    }
    //#endregion

    //#region Product Details

    getProductDetails = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/products`);
    }

    getProductDetail = async(idRequest: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/products/${idRequest}`);
    }

    sendProductDetails = async(request: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/products`, request);
    }

    updateProductDetail = async(request: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/products`, request);
    }

    //#endregion

  //#region Users

    getUsers = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/users`);
    }

    getUser = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/users/:idUser`);
    }

    setUser= async(user: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/users`, user);
    }

    updateUser  = async(user: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/users/:idUser`, user);
    }

    updateUserStatus  = async(user: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/users/:idUser/status/:idEstatus`, user);
    }

    //#endregion


    //#region Media Links

    getLinks = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/links`);
    }

    getLink = async(idlink: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/links/${idlink}`);
    }

    setLink = async(link: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/links`, link);
    }

    updateLink  = async(link: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/links`, link);
    }

    updateLinkStatus  = async(link: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/links/:idLink/status/:idEstatus`, link);
    }
    
    //#endregion

  //#endregion
}
