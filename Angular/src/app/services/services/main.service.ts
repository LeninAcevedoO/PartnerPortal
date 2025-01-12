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
    return this.http.post(`${this.UrlBase}/api/pp/v1/activity`, data);
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

    //#region Enterprice

    getEnterprices = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice`);
    }

    getEnterprice = async(idEnterprice: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice/${idEnterprice}`);
    }

    setEnterprice= async(user: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice`, user);
    }

    updateEnterprice  = async(user: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice/${user.idUser}`, {});
    }

    updateEnterpriceStatus  = async(user: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/enterprice/${user.idUser}/status/${user.idEstatus}`, {});
    }

    //#endregion

    //#region Product Details

    getProductDetails = async() => {
      return this.http.get(`${this.UrlBase}/api/pp/v1/products`);
    }

    getProductDetail = async(idComment: any) => {
      return this.http.get(`${this.UrlBase}/api/pp/v1/products/${idComment}`);
    }

    sendProductDetails = async(comment: any) => {
      return this.http.post(`${this.UrlBase}/api/pp/v1/products`, comment);
    }

    updateProductDetail = async(comment: any) => {
      return this.http.put(`${this.UrlBase}/api/pp/v1/products`, comment);
    }

    //#endregion

    //#region Media Links

    getMediaLinks = async() => {
      return this.http.get(`${this.UrlBase}/api/pp/v1/links`);
    }

    getMediaLink = async(idComment: any) => {
      return this.http.get(`${this.UrlBase}/api/pp/v1/links/${idComment}`);
    }

    sendMediaLinks = async(link: any) => {
      return this.http.post(`${this.UrlBase}/api/pp/v1/links`, link);
    }

    updateMediaLink = async(link: any) => {
      return this.http.put(`${this.UrlBase}/api/pp/v1/links`, link);
    }

    //#endregion

  //#endregion
}
