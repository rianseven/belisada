import { SigninRequest, UserLocalStorage } from './../../core/services/user/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { EmailChecking } from '../../core/services/user/models/user';

import swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  /* Mendeklarasikan nama variable*/
  signinFormGroup: FormGroup;
  alert: boolean;
  msg: string;
  emailChecking: EmailChecking = new EmailChecking();
  message: string;
  status: number;
  emailInvalid: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createFormControl();
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    });
  }

  /* Fungsi ini untuk melakukan input data sign in dengan melakukan validasi pengecekan email, password */
  onSubmit() {
      const signinRequest: SigninRequest = this.signinFormGroup.value;
      this.userService.signin(signinRequest).subscribe(
      result => {
        // Handle result
        if (result.status === 0) {
          this.alert = true;
          this.msg = result.message;
        } else {
          const token: string = result.token;
          this.userService.setUserToLocalStorage(token);
          this.router.navigate(['/']);
        }
      },
      error => {
        swal('belisada.co.id', 'unknown error', 'error');
        }
      );
  }

  /*Fungsi ini untuk berpindah halaman sign up jika user ingin melakukan pendaftaran*/
  goToSignUp() {
      this.router.navigateByUrl('/account/sign-up');
  }

  /* Fungsi ini untuk melakukan pengecekan email valid*/
  onSearchChange(searchValue: string) {
    const modelz = this.signinFormGroup.value;
    this.emailChecking.email = modelz.email,
    this.userService.checkEmail(this.emailChecking)
    .subscribe(
      data => {
        this.message = data.message;
        this.status = data.status;
        if (data.status === 1) {
          this.emailInvalid = 0;
        } else {
          this.emailInvalid = 1;
        }
      },
      error => {
          console.log('error', error);
      });
  }

}
