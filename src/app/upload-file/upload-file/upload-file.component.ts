import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>
  API: string

  constructor(
    private uploadFileService: UploadFileService
  ) { 
    this.API = environment.API
  }

  ngOnInit(): void {
  }

  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files
    const fileNames = []
    this.files = new Set()

    for (let i=0; i < selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }

    document.getElementById('arquivosSelecionados').innerHTML = fileNames.join(', ')
  }

  onUpload() {
    if (this.files && this.files.size > 0){
      this.uploadFileService.upload(this.files, `${this.API}api/upload`)
        .subscribe(
          response => console.log('upload concluido'),
          error => console.error(error)
        )
    }
  }

}
