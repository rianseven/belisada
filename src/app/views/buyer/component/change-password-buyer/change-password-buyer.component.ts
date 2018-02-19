import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password-buyer',
  templateUrl: './change-password-buyer.component.html',
  styleUrls: ['./change-password-buyer.component.scss']
})
export class ChangePasswordBuyerComponent implements OnInit {
  old_password: string;
  password_baru: string;
  password_ulangi: string;
  changePassword: any;
  token: any;
  role: any;
  viewPass: Boolean = false;
  viewPass2: Boolean = false;
  viewPass3: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  togglePass() {
    this.viewPass = !this.viewPass;
    const el = (<HTMLInputElement>document.getElementById('password'));
    if (this.viewPass) {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

  togglePass2() {
    this.viewPass2 = !this.viewPass2;
    const el2 = (<HTMLInputElement>document.getElementById('password2'));
    if (this.viewPass2) {
      el2.type = 'text';
    } else {
      el2.type = 'password';
    }
  }

  togglePass3() {
    this.viewPass3 = !this.viewPass3;
    const el3 = (<HTMLInputElement>document.getElementById('password3'));
    if (this.viewPass3) {
      el3.type = 'text';
    } else {
      el3.type = 'password';
    }
  }

}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import swal from 'sweetalert2';
// import { ChangePasswordService } from '../../../../core/service/changepassword/change-password.service';
// import { Title } from '@angular/platform-browser';

// @Component({
//   selector: 'app-change-password-buyer',
//   templateUrl: './change-password-buyer.component.html',
//   styleUrls: ['./change-password-buyer.component.scss']
// })
// export class ChangePasswordBuyerComponent implements OnInit {


//   constructor(private changePasswordService: ChangePasswordService,
//     private title: Title
//   ) { }

//   ngOnInit() {
//     this.title.setTitle('Belisada Seller - Change Password');
//     const user = JSON.parse(localStorage.user);
//     this.token = user.token;
//     this.role = user.role;
//     this.old_password = '';
//     this.getRole();
//   }


//   changePassword() {
//     const changePasswordData = {
//       oldPassword : this.old_password,
//       newPassword : this.password_baru,
//     };

//     if (this.password_baru !== this.password_ulangi) {
//       swal(
//         'Opps!',
//         'Ulangi password baru harus sama.',
//         'error'
//       );
//       return false;
//     }
//     this.changePasswordService.ChangePassword(changePasswordData).subscribe(data => {
//     });

//   }

// }
