import { TransactionComponent } from './transaction.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerimakasihPageComponent } from '@belisada/features/transaction/terimakasih-page/terimakasih-page.component';
import { OnlyLoggedInUsersGuard } from '@belisada/core/services';

// const routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    // component: TransactionComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Checkout'
        }
      },
      {
        path: 'terimakasih/:id',
        component: TerimakasihPageComponent,
        data: {
          title: 'Checkout'
        }
      },
      {
        path: 'finish',
        component: TerimakasihPageComponent,
        data: {
          title: 'Credit Card Checkout'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
