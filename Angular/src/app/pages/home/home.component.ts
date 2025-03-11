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

  onSubmit() {
    console.log('Original Comment:', this.comment);

  
    const encryptedComment = this.utilsService.encryptAES(this.comment);
    console.log('Encrypted Comment:', encryptedComment);

  
    this.http.post<any>('http://localhost:3000/api/encrypt-decrypt', { encryptedComment })
      .subscribe(response => {
        console.log('Response from API (re-encrypted comment):', response.decryptedComment);
      });
  }
}
