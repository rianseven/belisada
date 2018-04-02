import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { SigninRequest, UserLocalStorage } from '../../../core/services/user/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  createComForm: FormGroup;

  token: string;
  name: FormControl;
  email: FormControl;
  phone: FormControl;
  gender: FormControl;
  dateOfBirth: FormControl;

  ship;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.fillForms();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.phone = new FormControl('', Validators.required);
    this.gender = new FormControl('', Validators.required);
    this.dateOfBirth = new FormControl('', Validators.required);
  }

  createForm() {
    this.createComForm = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth
     });
  }

  fillForms() {
    const model = this.createComForm.value;
    this.userService.getProfile(localStorage.getItem('token')).subscribe(data => {
    this.name.setValue(data.name);
    this.email.setValue(data.email);
    this.phone.setValue(data.phone);
    this.gender.setValue(data.gender);
    this.dateOfBirth.setValue(data.dateOfBirth);
    });
  }

  onSubmit() {
    const model = this.createComForm.value;
    const b = {
      name: model.name,
      phone: model.phone,
      gender: model.gender,
      dateOfBirth: model.dateOfBirth,
    };
    console.log('data', b);
    this.userService.updateProfile(b).subscribe(data => {
      console.log('test', data);
      swal(
        'Sukses',
        'Ubah data pengiriman berhasil.',
        'success'
      );
    });
   }

}