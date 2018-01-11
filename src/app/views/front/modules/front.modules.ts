import { SidebarBuyerComponent } from './../component/buyer-dashboard/sidebar-buyer/sidebar-buyer.component';
import { SearchService } from './../../../core/service/search/search.service';
import { ProductDetailService } from './../../../core/service/product-detail/product-detail.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel/src/ngx-carousel/ngx-carousel.interface';
import { NgxCarouselModule } from 'ngx-carousel/src/ngx-carousel.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { FrontLayoutComponent } from '../../../core/layout/front-layout/front-layout.component';
import { HomeComponent } from '../component/home/home.component';
import { FrontHeaderComponent } from '../component/front-header/front-header.component';
import { FrontNavComponent } from '../component/front-nav/front-nav.component';
import { FrontSlideShowComponent } from '../component/front-slide-show/front-slide-show.component';
import { FrontGridCarouselComponent } from '../component/front-grid-carousel/front-grid-carousel.component';
import { FrontFooterComponent } from '../component/front-footer/front-footer.component';
import { ProductDetailComponent } from '../component/product-detail/product-detail.component';
import { ProductSearchComponent } from '../component/product-search/product-search.component';
import { SharedModules } from '../../../core/shared/shared.modules';
import { HomeService } from '../../../core/service/home/home.service';
import { BuyerDashboardComponent } from '../component/buyer-dashboard/buyer-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { HomeReducer, DetailReducer } from '../../../store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from '../../../store/effects/front';
import { ShipingAddressComponent } from '../component/buyer-dashboard/shiping-address/shiping-address.component';
import { InfoComponent } from '../component/info/info.component';

@NgModule({
  declarations: [
    FrontLayoutComponent,
    HomeComponent,
    FrontHeaderComponent,
    FrontNavComponent,
    FrontSlideShowComponent,
    FrontGridCarouselComponent,
    FrontFooterComponent,
    ProductDetailComponent,
    InfoComponent,
    ShipingAddressComponent,
    BuyerDashboardComponent,
    SidebarBuyerComponent,
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    NgxCarouselModule,
    RouterModule,
    FormsModule,
    SharedModules,
    StoreModule.forFeature('home', HomeReducer),
    StoreModule.forFeature('detail', DetailReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  providers: [
    NgxCarousel,
    HomeService,
    SearchService,
    ProductDetailService
  ]
})
export class FrontModules { }
