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

  logout(): Observable<Resultado> {
    return this.http.post<Resultado>(this.UrlBase + "/api/pp/v1/logout", {});
  }

  logRouteVisit(data: any) {
    return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/activity`, data);
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
    return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/catalogs/status/attendant`);
  }

  getCatMediaType = async() => {
    return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/catalogs/media-types`);

  }

  //#endregion

  //#region Favorites

  async setFavorite(favorite_id: any) {
    return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/favorites/${btoa(favorite_id)}`, {});
  }

  getFavorites = async() => {
    return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/favorites`);
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

    //#region ManagerComments

    getManagerComments = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/comments`);
    }

    getManagerComment = async(idComment: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/comments/${idComment}`);
    }

    sendManagerComments = async(comment: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/comments`, comment);
    }

    updateManagerComment = async(comment: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/comments`, comment);
    }

    //#endregion

  //#region Users

    getUsers = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/users`);
    }

    getUser = async(user_id: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/users/${user_id}`);
    }

    setUser= async(user: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/users`, user);
    }

    updateUser  = async(user: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/users`, user);
    }

    updateUserStatus  = async(user: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/users/${user.user_id}/status/${user.status_id}`, user);
    }

    //#endregion

    //#region AttentionStatus

    getAllAttentionStatus = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/attention`);
    }

    setAttentionStatus= async(attention: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/attention`, attention);
    }

    updateAttentionStatus  = async(attention: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/attention`, attention);
    }

    updateAttentionStatusStatus  = async(attention: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/attention/${attention.attention_status_id}/status/${attention.status_id}`, attention);
    }

    //#endregion

    //#region Roles

    getRoles = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/role`);
    }

    getRole = async(idrole: any) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/role/${idrole}`);
    }

    setRole = async(role: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/role`, role);
    }

    updateRole  = async(role: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/role`, role);
    }
    
    updateRoleStatus = async (role: any) => {
      return this.http.put<Resultado>(
        `${this.UrlBase}/api/pp/v1/role/${role.role_id}/status/${role.status_id}`,
        role
      );
    };
    
    //#endregion

    //#region Media Links

    getLinks = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/links`);
    }

    getLinksToShow = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/links/show`);
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
    
    //#region Demos
    
    getDemos = async() => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/demos`);
    }

    getDemosByVertical = async(vertix: number) => {
      return this.http.get<Resultado>(`${this.UrlBase}/api/pp/v1/demos/verticals/${vertix}`);
    }

    setDemo = async(demo: any) => {
      return this.http.post<Resultado>(`${this.UrlBase}/api/pp/v1/demos`, demo);
    }
    
    updateDemo = async(demo: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/demos`, demo);
    }

    updateDemoStatus = async(vertix: any) => {
      return this.http.put<Resultado>(`${this.UrlBase}/api/pp/v1/demos/${vertix.demo_id}/status/${vertix.status_id}`, {});
    }

    //#endregion
  //#endregion
}
