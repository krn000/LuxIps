import { Component, ViewChild, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements DoCheck {

  @Input() msg: string;
  @Input() isShow: boolean;
  @Output() hideModal = new EventEmitter<any>();
  @Output() hide2Modal = new EventEmitter<any>();
  @ViewChild('confirmModal', { static: false }) public confirmModal: ModalDirective;
  constructor() { }

  ngDoCheck() {
    if (this.confirmModal) {
      if (this.isShow) {
        this.confirmModal.show();
      } else {
        this.confirmModal.hide();
      }
    }

  }
  
  dismissModal(): void {
    this.hideModal.emit(false);
  }
  successModal(): void {
    this.hide2Modal.emit(true);
  }


}
