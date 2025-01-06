import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private _spinnerSvr: NgxSpinnerService) { }

  public llamarSpiner() {
    this._spinnerSvr.show();
  }

  public detenerSpiner() {
    this._spinnerSvr.hide();
  }
}
