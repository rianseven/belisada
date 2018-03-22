import { SigninRequest } from './../../core/services/user/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomAlert } from './alert';
import swal from 'sweetalert2';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinFormGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createFormControl();
  }

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

  onSubmit() {
    console.log('this.signinFormGroup: ', this.signinFormGroup);
    const signinRequest: SigninRequest = this.signinFormGroup.value;
    this.userService.signin(signinRequest).subscribe(
      result => {
        // Handle result
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  toForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
