import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RecaptchaModule, RECAPTCHA_SETTINGS} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
// import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/services/cart/models/user';
// PasswordValidation
// import { PasswordValidation } from '../../shared/validators/password.validator';
import { UserService } from '../../core/services/user/user.service';
import { SignupData } from '../../core/services/user/models/user';
import { PasswordValidation } from '../../shared/validators/password.validator';
// import { AlertService } from '../../core/services/service/alert/alert.service';
// import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public declarativeFormCaptchaValue: string;
  model: any = {};
  currentUser: User;
  users: User[] = [];
  signupData: SignupData = new SignupData();
  loading = false;
  phoneNumber: FormControl;
  password: FormControl;
  email: FormControl;
  confirmPassword: FormControl;
  public reactiveForm;
  public vForValidation: FormGroup;
  fullname: FormControl;
  constructor(
    private router: Router,
    private userService: UserService,
    // private alertService: AlertService,
    private fb: FormBuilder
    // private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    // this.loadAllUsers();
    // this.fullname = new FormControl('', Validators.required);
    // this.password = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8)
    // ]);
    this.vForValidation = this.fb.group({
      fullname: new FormControl(null, Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
        // Validators.minLength(8)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
    ]),
    phoneNumber: new FormControl('', [
      Validators.pattern('[0-9]+')
    ]),
    recaptchaReactive: new FormControl(null, Validators.required)
  }
  , {validator: PasswordValidation.MatchPassword}
);
  function passwordMatchValidator(g: FormGroup) {
    return g.get('password').value !== g.get('confirmPassword').value
       ? null : {'mismatch': true};
 }
 console.log('asdasda', passwordMatchValidator);
    }
   
  onTest(k: NgForm) {
    const model = this.vForValidation.value;
    this.loading = true;
    const tesTing: User = new User();
    tesTing.fullname = model.fullname,
    tesTing.email = model.email,
    tesTing.phone = model.phoneNumber,
    tesTing.password = model.password;
    // {
    //   fullname: this.fullname,
    //   email: this.email,
    //   phone: this.phoneNumber
    // };
    this.userService.create(tesTing)
        .subscribe(
            data => {
              console.log('this.alertService.success:', data);
              // this.alertService.success('Registration successful', true);
                // this.router.navigate(['login']);
            },
            error => {
              console.log(error);
              alert(error);
              // this.alertService.error(error);
                this.loading = false;
            });
    console.log(tesTing);
    this.vForValidation.reset();

    console.log(k);
  }
  register() {
    this.loading = true;
    this.userService.signup (this.model)
        .subscribe(
            data => {
              // this.alertService.success('Registration successful', true);
                // this.router.navigate(['login']);
            },
            error => {
              // this.alertService.error(error);
                this.loading = false;
            });
}

}