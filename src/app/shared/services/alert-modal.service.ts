import { Injectable } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

import { AlertTypes } from '../enums/alert-types';


@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(message: string, type: string, dismisstimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message
  
    if (dismisstimeout) {
      setTimeout(() => bsModalRef.hide(), dismisstimeout);
    }

  }

  showAlertDanger(message: string)  {
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000)
  }

}
