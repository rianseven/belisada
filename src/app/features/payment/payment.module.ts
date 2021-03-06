import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { ThemeModule } from '../../theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CommonModule,
    ThemeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
