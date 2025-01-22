import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/services/services/context.service';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public clientCredentials = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)
  })
  showPsw = false;
  constructor(private toastr: ToastrService,
    private router: Router,
    private _service: MainService,
    private _context: ContextService,
    private _utilsSvc: UtilsService) { }

  ngOnInit(): void {
    if (this._context.isAuth())
      this.router.navigate(['/home']);
  }

  login() {
    if (this.clientCredentials.invalid) {
      this.toastr.warning('There are missing fields to fill out', 'Incomplete');
      return;
    }
    const clientCredentials = {
      // email: this._utilsSvc.encryptAES(this.clientCredentials.value.username, '', ''),
      // password: this._utilsSvc.encryptAES(this.clientCredentials.value.password, '','')
    }
    this._service.login(clientCredentials).subscribe((resp: Resultado) => {
      if (resp.success == 'true') {
        localStorage.clear();
        this._context.setInformation(resp.data[0]);
        this.toastr.success(`Hi ${resp.data[0].first_name} ${resp.data[0].last_name}`, 'Welcome');
        this.router.navigate(['/home']);
      }
    });
  }

  handleClear() {
    this.clientCredentials.patchValue({ password: '' });
  }

  // validarEntrada(event: KeyboardEvent): boolean {
  //   const valorActual = this.clientCredentials.value.numEmpleado;

  //   if (event.key === 'Backspace')
  //     return true;
  //   const nuevoValor = valorActual + event.key;
  //   const patronRegex: RegExp = /^[0-9]\d*$/;
  //   if (!patronRegex.test(nuevoValor)) {
  //     event.preventDefault();
  //     return false;
  //   }
  //   return true;
  // }
}
