import { Component, ViewChild, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html'
})
export class SuccessModalComponent implements DoCheck {

  @Input() msg: string;
  @Input() isShow: boolean;
  @Output() hideModal = new EventEmitter<any>();
  @ViewChild('successModal', { static: false }) public successModal: ModalDirective;
  constructor() { }

  ngDoCheck() {
    if (this.successModal) {
      if (this.isShow) {
        this.successModal.show();
      } else {
        this.successModal.hide();
      }
    }

  }
  
  dismissModal(): void {
    this.hideModal.emit(false);
  }

}
