import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FilterComponent } from './filter-component/filter-component.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatAutocompleteModule, } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SuccessModalComponent,
    ErrorModalComponent,
    ConfirmModalComponent,
    FilterComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    ModalModule,
    UiSwitchModule,
    CollapseModule,
    AlertModule,
    MatAutocompleteModule,
    MatInputModule,
   
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    ModalModule,
    UiSwitchModule,
    SuccessModalComponent,
    ErrorModalComponent,
    ConfirmModalComponent,
    FilterComponent,
    CollapseModule,
    AlertModule,
    MatAutocompleteModule,
    MatInputModule,
    LoaderComponent,


  ]

})
export class SharedModule { }
