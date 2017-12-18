import { ModalPopupComponent } from './clients/pages/seller/modal-popup/modal-popup.component';
import { ForgotPasswordComponent } from './clients/pages/forgot-password/forgot-password.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// semantic-ui module
import { SuiModule } from 'ng2-semantic-ui';

// Component
import { AppComponent } from './app.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { AuthenticationLayoutComponent } from './clients/layouts/authentication-layout/authentication-layout.component';
import { FullLayoutComponent } from './clients/layouts/full-layout/full-layout.component';
import { LoginComponent } from './clients/pages/login/login.component';
import { RegistrationComponent } from './clients/pages/registration/registration.component';
import { SidebarComponent } from './clients/components/sidebar/sidebar.component';
import { DashboardComponent } from './clients/pages/seller/dashboard/dashboard.component';
import { HeaderComponent } from './clients/components/header/header.component';
import { FooterComponent } from './clients/components/footer/footer.component';
import { ProductComponent } from './clients/pages/seller/product/product.component';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http/src/http_module';
import { CategoryService } from './servers/service/category/category.service';
import { Configuration } from './servers/config/configuration';
import { LoginService } from './servers/service/login/login.service';
import { SearchService } from './servers/service/search/search.service';
import { AddProductsComponent } from './clients/pages/seller/add-products/add-products.component';
import { ProfileComponent } from './clients/pages/seller/profile/profile.component';
import { RekeningComponent } from './clients/pages/seller/rekening/rekening.component';
import { TokoComponent } from './clients/pages/seller/toko/toko.component';
import { InfoPerusahaanComponent } from './clients/pages/seller/info-perusahaan/info-perusahaan.component';
import { KontakComponent } from './clients/pages/seller/kontak/kontak.component';
import { KontakDetailComponent } from './clients/pages/seller/kontak-detail/kontak-detail.component';
import { FaqComponent } from './clients/pages/seller/faq/faq.component';
import { NotificationComponent } from './clients/components/dashboard/notification/notification.component';
import { SalesStatusComponent } from './clients/components/dashboard/sales-status/sales-status.component';
import { MyTopProdukComponent } from './clients/components/dashboard/my-top-produk/my-top-produk.component';
import { ProdukReportComponent } from './clients/components/dashboard/produk-report/produk-report.component';
import { StatusInvoiceComponent } from './clients/components/dashboard/status-invoice/status-invoice.component';
import { SearchDashboardComponent } from './clients/components/dashboard/search-dashboard/search-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    AuthenticationLayoutComponent,
    LoginComponent,
    RegistrationComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ModalPopupComponent,
    AddProductsComponent,
    ProductComponent,
    ModalPopupComponent,
    ProfileComponent,
    RekeningComponent,
    TokoComponent,
    InfoPerusahaanComponent,
    KontakComponent,
    KontakDetailComponent,
    FaqComponent
    NotificationComponent,
    SalesStatusComponent,
    MyTopProdukComponent,
    ProdukReportComponent,
    StatusInvoiceComponent,
    SearchDashboardComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    CategoryService,
    LoginService,
    SearchService,
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }