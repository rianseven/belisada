import { ProfileEditComponent } from './components/buyer/profile-edit/profile-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutBuyerComponent } from './components/buyer/layout-buyer/layout-buyer.component';
import { ProfileComponent } from './components/buyer/profile/profile.component';
import { SignUpActivationComponent } from './components/sign-up-activation/sign-up-activation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { SaniComponent } from './components/sani/sani.component';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                data: {
                    title: 'home'
                }
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                data: {
                    title: 'Lose Password'
                }
            },
            {
                path: 'reset-password/:id',
                component: ResetPasswordComponent,
                data: {
                    title: 'Reset Password'
                }
            },
        ]
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {
                path: 'sign-in',
                component: SigninComponent,
                data: {
                    title: 'Sign In'
                }
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
                data: {
                    title: 'Sign Up'
                }
            },
        ]
    },
    {
        path: 'sani',
        component: SaniComponent
    },
    {
        path: 'sign-up-activation',
        component: SignUpActivationComponent
    },

    {
        path: 'buyer',
        component: LayoutBuyerComponent,
        children: [
          {
            path: '',
            component: ProfileComponent,
            data: {
              title: 'Profile'
            }
          },
          {
            path: 'profile',
            component: ProfileComponent,
            data: {
              title: 'Profile'
            }
          },
          {
            path: 'profile-edit',
            component: ProfileEditComponent,
            data: {
                title: 'Edit Profile'
            }
          },
        ]
    },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
