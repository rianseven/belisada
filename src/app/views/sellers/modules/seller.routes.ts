import { TarikDanaComponent } from './../component/tarik-dana/tarik-dana.component';
import { CourierComponent } from './../component/courier/courier.component';
import { NewSellerComponent } from './../component/new-seller/new-seller.component';
import { FaqSellerComponent } from './../component/faq-seller/faq-seller.component';
import { ProductListComponent } from './../component/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FullLayoutComponent } from '../../../core/layout/full-layout/full-layout.component';
import { OnlyLoggedInUsersGuard } from '../../../core/shared/authguard';
import { SearchDashboardComponent } from '../component/dashboard/search-dashboard/search-dashboard.component';
import { ModalPopupComponent } from '../component/modal-popup/modal-popup.component';
import { AddProductsComponent } from '../component/add-products/add-products.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { RekeningComponent } from '../component/rekening/rekening.component';
import { TokoComponent } from '../component/toko/toko.component';
import { InfoPerusahaanComponent } from '../component/info-perusahaan/info-perusahaan.component';
import { ChangePasswordComponent } from '../component/change-password/change-password.component';
import { KontakComponent } from '../component/kontak/kontak.component';
import { SallesReportComponent } from '../component/salles-report/salles-report.component';
import { KontakDetailComponent } from '../component/kontak-detail/kontak-detail.component';
import { PaymentInfoComponent } from '../component/payment-info/payment-info.component';
import { StatisticsComponent } from '../component/statistics/statistics.component';
import { StoreComponent } from '../component/store/store.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { LacakBarangAndaComponent } from '../component/lacak-barang-anda/lacak-barang-anda.component';
import { InfoPengirimanComponent } from '../component/info-pengiriman/info-pengiriman.component';

const sellerroutes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'modal-popup',
        component: ModalPopupComponent,
      },
      {
        path: 'add-products/:id',
        component: AddProductsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'rekening',
        component: RekeningComponent,
      },
      {
        path: 'toko',
        component: TokoComponent,
      },
      {
        path: 'info-perusahaan',
        component: InfoPerusahaanComponent,
      }, {
        path: 'change-password',
        component: ChangePasswordComponent,
      }, {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: 'salles-report',
        component: SallesReportComponent,
      },
      {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: 'kontak-detail',
        component: KontakDetailComponent,
      },
      {
        path: 'faq-seller',
        component: FaqSellerComponent,
      },
      {
        path: 'payment-info',
        component: PaymentInfoComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'my-store',
        component: StoreComponent
      },
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'new-seller',
        component: NewSellerComponent
      },
      {
        path: 'courier',
        component: CourierComponent
      },
      {
        path: 'tarik-dana',
        component: TarikDanaComponent
      },
      {
        path: 'lacak-barang-anda',
        component: LacakBarangAndaComponent
      },
      {
        path: 'info-pengiriman',
        component: InfoPengirimanComponent
      }
    ]
  }
];

@NgModule ({
  imports: [RouterModule.forChild(sellerroutes)],
  exports: [RouterModule]
})
export class SellerRoutes { }
