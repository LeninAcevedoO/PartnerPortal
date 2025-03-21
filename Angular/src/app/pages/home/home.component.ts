import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private toastr: ToastrService, private utilsService: UtilsService, private http: HttpClient) {}

  comment: string = 'Hello, this is a test';
}
