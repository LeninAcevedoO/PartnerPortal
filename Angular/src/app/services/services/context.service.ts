import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private warningTimer: any;
  private logoutTimer: any;
  private warningTime: number = 30000;
  private logoutTime: number = 60000; 

  constructor() {}

  isAuth() {
    if (Number(sessionStorage.getItem('id')) > 0)
      return true;
    else
      return false;
  }

  theRol() {
    return Number(btoa(String(sessionStorage.getItem('rol'))));
  }

  setInformation(data?: any) {
    if (data) {
      sessionStorage.setItem('id', data.id_person);
      sessionStorage.setItem('first_name', data.first_name);
      sessionStorage.setItem('last_name', data.last_name);
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('roles', JSON.stringify(data.role));
    }
  }

  logout(): void {
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
