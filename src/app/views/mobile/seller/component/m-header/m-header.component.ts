import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { LoginService } from '../../../../../core/service/login/login.service';
import { ChatService } from '../../../../../core/service/chat/chat.service';

@Component({
  selector: 'app-m-header',
  templateUrl: './m-header.component.html',
  styleUrls: ['./m-header.component.scss']
})
export class MHeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private chat: ChatService) { }
  user: any;
  ngOnInit() {
    this.user = this.loginService.whoLogin();
    console.log('loged user:', this.user);
  }

  logout() {
    // alert('logout');
    swal({
      title: 'Alert',
      text: 'Apakah Anda akan keluar dari Account Area.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Iya'
    }).then((result) => {
      if (result.value) {
        this.loginService.logout();
        this.chat.disconnect();
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(()=> {
          this.router.navigateByUrl('/');
        });
      }
    });
  }

}