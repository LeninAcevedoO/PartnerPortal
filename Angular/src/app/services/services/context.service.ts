import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() {
  }

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

  logout() {
    sessionStorage.clear();
  }
}
