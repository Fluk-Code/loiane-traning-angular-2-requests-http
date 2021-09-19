import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs/rxjs-operators';
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

  progress: number

  constructor(
    private uploadFileService: UploadFileService
  ) { 
    this.API = environment.API
    this.progress = 0
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
  
    this.progress = 0
  }

  onUpload() {
    if (this.files && this.files.size > 0){
      this.uploadFileService.upload(this.files, `${this.API}upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress)
            this.progress = progress
          }),
          filterResponse()
        )
        // .subscribe(
        //   (event: HttpEvent<Object>) => {
        //     if (event.type === HttpEventType.Response) {
        //       console.log('upload concluido')
        //     }
        //     else if (event.type === HttpEventType.UploadProgress) {
        //       const percentDone = Math.round((event.loaded * 100)/ event.total)
        //       this.progress = percentDone
        //       console.log('Progresso: ', percentDone)
        //     }
        //     console.log(event)
        //   },
        //   error => console.error(error)
        // )
          .subscribe(
            response => console.log('Upload Concluido'),
            error => console.error(error)
          )
    }
  }

}
