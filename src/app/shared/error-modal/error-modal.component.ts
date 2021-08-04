import { Component, ViewChild, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html'
})
export class ErrorModalComponent implements DoCheck {

  @Input() msg: string;
  @Input() isShow: boolean;
  @Output() hideModal = new EventEmitter<any>();
  @ViewChild('dangerModal', { static: false }) public dangerModal: ModalDirective;
  constructor() { }

  ngDoCheck() {
    if (this.dangerModal) {
      if (this.isShow) {
        this.dangerModal.show();
      } else {
        this.dangerModal.hide();
      }
    }

  }
  
  dismissModal(): void {
    this.hideModal.emit(false);
  }

}
