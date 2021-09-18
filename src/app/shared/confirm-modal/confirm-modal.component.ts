import { Component, Input, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input()
  title: string 

  @Input()
  message: string

  @Input()
  declineTxt: string = 'Cancelar'

  @Input()
  confirmTxt: string = 'Confirmar'

  confirmResult: Subject<boolean>
  
  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.confirmResult = new Subject()
  }

  onConfirm(): void {
    this.confirmAndClose(true)
  }

  onDecline(): void {
    this.confirmAndClose(false)
  }

  private confirmAndClose(value: boolean): void {
    this.confirmResult.next(value)
    this.bsModalRef.hide()
  }

}
