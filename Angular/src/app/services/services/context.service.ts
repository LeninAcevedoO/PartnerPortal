import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() {
  }

  isAuth() {
    if (Number(localStorage.getItem('id')) > 0)
      return true;
    else
      return false;
  }

  setInformation(data?: any) {
    if (data) {
      localStorage.setItem('id', data.id_person);
      localStorage.setItem('first_name', data.first_name);
      localStorage.setItem('last_name', data.last_name);
      localStorage.setItem('email', data.email);
      localStorage.setItem('roles', JSON.stringify(data.role));
    }
  }

  logout() {
    localStorage.clear();
  }
}
