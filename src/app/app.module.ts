import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaLoaderService } from 'ng-recaptcha';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { CoreModule } from '@belisada/core/core.module';
import { Configuration } from '@belisada/core/config';

import { SharedModule } from '@belisada/shared/shared.module';

import { Page404Component, MaintenanceComponent } from '@belisada/features/error-pages';
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from '@belisada/features/landing-page/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelsComponent } from '@belisada/shared/components/models/models.component';
import { FieldErrorDisplayComponent } from '@belisada/features/buyer/create-store/field-error-display/field-error-display.component';
import { AuthInfoComponent } from '@belisada/features/auth';
import { StoreEffects } from '@belisada/core/ngrx/effects';
import { ProvinceReducer, CityReducer } from '@belisada/core/ngrx/reducers/store';
import { AuthComponent, SigninComponent, SignUpComponent, SignUpActivationComponent,
  ForgotPasswordComponent, ResetPasswordComponent } from '@belisada/features/auth';



@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    MaintenanceComponent,

    // Should move into themes
    // AuthComponent,
    // AuthInfoComponent,
    // SigninComponent,
    // SignUpComponent,
    // SignUpActivationComponent,
    // ForgotPasswordComponent,
    // ResetPasswordComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ModelsComponent,
    FieldErrorDisplayComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot({'province' : ProvinceReducer, 'city' : CityReducer}),
    EffectsModule.forRoot([StoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: APP_BASE_HREF, useValue: '/' },
      // Configuration,
      // UserService,
      // SubscribeService,
      // AuthenticationService,
      // OnlyLoggedInUsersGuard,
      // {
      // provide: RECAPTCHA_SETTINGS,
      // useValue: {
      //     siteKey: '6Ld2TUwUAAAAAFo9u34dxrn7ocWjqRa42mr2kWJ1',
      // } as RecaptchaSettings,
      // },
      // { provide: HTTP_INTERCEPTORS,
      // useClass: Interceptor,
      // multi: true
      // },
      // RecaptchaLoaderService,
      // FlagService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
