import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private warningTimer: any;
  private logoutTimer: any;
  private warningTime: number = 6000000;
  private logoutTime: number = 660000; 

  constructor(private _utilsSvc: UtilsService,
    private _service: MainService
  ) {}

  isAuth() {
    if (Number(this._utilsSvc.decryptAES(String(sessionStorage.getItem('mat__resultant__pp__id')))) > 0)
      return true;
    else
      return false;
  }

  theRol() {
    return Number(this._utilsSvc.decryptAES(String(sessionStorage.getItem('mat__resultant__pp__role_id'))));
  }

  setInformation(data: any) {
    if (data[0]) {
      sessionStorage.setItem('mat__resultant__pp__id', this._utilsSvc.encryptAES(String(data[0].user_id)));
      sessionStorage.setItem('mat__resultant__pp__name', this._utilsSvc.encryptAES(String(data[0].name)));
      sessionStorage.setItem('mat__resultant__pp__email', this._utilsSvc.encryptAES(String(data[0].email)));
      sessionStorage.setItem('mat__resultant__pp__role_id', this._utilsSvc.encryptAES(String(data[0].role_id)));
      sessionStorage.setItem('mat__resultant__pp__role_name', this._utilsSvc.encryptAES(String(data[0].role_name)));
      sessionStorage.setItem('mat__resultant__pp__company_id', this._utilsSvc.encryptAES(String(data[0].company_id)));
      sessionStorage.setItem('mat__resultant__pp__company_name', this._utilsSvc.encryptAES(String(data[0].company_name)));
      sessionStorage.setItem('mat__resultant__pp__tkn', data[0].token);
    }
  }

  logout(): void {
    this._service.logout();
    sessionStorage.clear();
    this.clearTimers(); 
  }

  resetInactivityTimer(onWarning: () => void, onLogout: () => void): void {
    this.clearTimers(); 

    this.warningTimer = setTimeout(() => {
      onWarning(); 
      this.logoutTimer = setTimeout(() => {
        onLogout(); 
      }, this.logoutTime - this.warningTime);
    }, this.warningTime);
  }

  clearTimers(): void {
    clearTimeout(this.warningTimer);
    clearTimeout(this.logoutTimer);
  }
}
