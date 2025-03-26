import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";
import * as moment from 'moment';

@Component({
  selector: 'app-new-media-links',
  templateUrl: './new-media-links.component.html',
  styleUrls: ['./new-media-links.component.scss']
})
export class NewMediaLinksComponent {
  titulo = "Add system link";
  isShowPsw = false;

  minDate: Date = new Date();

  formlink = new FormGroup({
    link_id: new FormControl<number>(0),
    link_url: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
    company_id: new FormControl<number | null>(null, Validators.required),
    // multimedia_id: new FormControl<number | null>(null, Validators.required),
    expiration_date: new FormControl<Date | null>(null, [
      Validators.required,]),
  });

  cats: any = {
    companies: [],
    // multimedia_types: [],
  };

  filePreview: string | ArrayBuffer | null = null;
  isImage: boolean = false;
  isVideo: boolean = false;
  isAudio: boolean = false;


  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewMediaLinksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data?.link_id) {
      this.formlink.patchValue(this.data);
      this.titulo = "Edit link";
    }
    this.getCats();
  }

  getCats = async () => {
    await this.getCatEnterprices();
    // await this.getCatMediaType();
    this.cdRef.detectChanges();
  };

  getCatEnterprices = async () => {
    (await this._service.getCatEnterprices()).subscribe((resp: Resultado) => {
      if (resp.success == "true") this.cats.companies = resp.data;
      else this.toastr.error(resp.message, "Error");
    });
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'audio/aac'];
      const fileType = file.type;
  
      if (validExtensions.includes(fileType)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview = reader.result;
          this.convertToBase64(file); 
        };
  
        if (fileType.startsWith('image')) {
          this.isImage = true;
          this.isVideo = false;
          this.isAudio = false;
        } else if (fileType.startsWith('video')) {
          this.isVideo = true;
          this.isImage = false;
          this.isAudio = false;
        } else if (fileType.startsWith('audio')) {
          this.isAudio = true;
          this.isImage = false;
          this.isVideo = false;
        }
        reader.readAsDataURL(file);
      } else {
        this.toastr.warning("Invalid file type. Please select an image, video, or audio file.", "Invalid File");
      }
    }
  }
  
  fileBase64: string | null = null;
  
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileBase64 = reader.result as string;
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  }
  
  AddEditLink() {
    if (this.formlink.invalid) {
      this.toastr.warning("The form is not valid, try again", "Form not valid");
      return;
    }
    if (this.formlink.value.link_id) this.EditLink();
    else this.AddLink();
  }

  // AddLink = async () => {
  //   let link = {
  //     ...this.formlink.value,
  //     expiration_date: moment(this.formlink.value.expiration_date).format('YYYY-MM-DD') 
  //   };
  
  //   (await this._service.setLink(link)).subscribe((resp: Resultado) => {
  //     if (resp.success == "true") {
  //       this.toastr.success("The link was added successfully", "Success");
  //       this.onNoClick(true);
  //     } else {
  //       this.toastr.error(resp.message, "Error");
  //     }
  //   });
  // };

  AddLink = async () => {
    if (!this.fileBase64) {
      this.toastr.warning("You must select a file to upload.", "No File Selected");
      return;
    }
  
    const mimeType = this.getMimeType(this.fileBase64);
    const fileName = `media_${Date.now()}`; // Genera un nombre único
    const base64Data = this.fileBase64.split(',')[1]; // Extrae solo los datos base64
  
    const link = {
      ...this.formlink.value,
      expiration_date: moment(this.formlink.value.expiration_date).format('YYYY-MM-DD'),
      miniature: base64Data,
      mimeType,
      fileName
    };
  
    (await this._service.setLink(link)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The link was added successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };
  
  // Método para obtener el MIME type del archivo
  getMimeType(base64: string): string {
    const match = base64.match(/^data:(.*);base64,/);
    return match ? match[1] : '';
  }
  
  
  EditLink = async () => {
    let link = {
      ...this.formlink.value,
      expiration_date: moment(this.formlink.value.expiration_date).format('YYYY-MM-DD') 
    };
  
    (await this._service.updateLink(link)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The link was updated successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };

  validateNumbers(value: any, e: any) {
    return validarNumeros(e, value);
  }

  onNoClick(resp: boolean = false) {
    this.dialogRef.close(resp);
  }

  clearFilePreview() {
    this.filePreview = null;
    this.isImage = false;
    this.isVideo = false;
    this.isAudio = false;
  }
  
}