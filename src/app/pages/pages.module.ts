import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthModule } from './auth/auth.module';
import { AngularMaterialModule } from './material.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    AuthModule,
    AngularMaterialModule
  ],
  declarations: [
    PagesComponent,
    UserManagementComponent,
  ],
})
export class PagesModule {
}
